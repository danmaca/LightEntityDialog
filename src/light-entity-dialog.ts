import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type {
  HomeAssistant,
  HomeAssistantEntityState,
  LightEntityDialogConfig
} from "./types";

interface RGB {
  r: number;
  g: number;
  b: number;
}

@customElement("light-entity-dialog")
export class LightEntityDialog extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;

  @state() private _config!: LightEntityDialogConfig;
  @state() private _brightnessPct: number | null = null;
  @state() private _colorTemp: number | null = null;
  @state() private _colorHex: string | null = null;

  setConfig(config: LightEntityDialogConfig): void {
    if (!config || !config.entity) {
      throw new Error("Entity must be specified");
    }
    this._config = config;
  }

  set hassState(hass: HomeAssistant) {
    this.hass = hass;
    this._updateFromEntity();
  }

  // Backwards compatibility: Lovelace expects `hass` property
  set hass(hass: HomeAssistant) {
    (this as any)._hassInternal = hass;
    this._updateFromEntity();
  }

  get hass(): HomeAssistant {
    return (this as any)._hassInternal;
  }

  private get _entity(): HomeAssistantEntityState | undefined {
    if (!this.hass || !this._config) {
      return undefined;
    }
    return this.hass.states[this._config.entity];
  }

  private _updateFromEntity(): void {
    const entity = this._entity;
    if (!entity) {
      return;
    }

    const attrs = entity.attributes;

    if (attrs.brightness != null) {
      const pct = Math.round((attrs.brightness / 255) * 100);
      this._brightnessPct = pct;
    } else {
      this._brightnessPct = null;
    }

    if (typeof attrs.color_temp_kelvin === "number") {
      this._colorTemp = attrs.color_temp_kelvin;
    } else if (typeof attrs.color_temp === "number") {
      // Fallback for older integrations still exposing mireds
      this._colorTemp = Math.round(1_000_000 / attrs.color_temp);
    } else {
      this._colorTemp = null;
    }

    const rgb = this._getRgbFromAttributes(attrs);
    this._colorHex = rgb ? this._rgbToHex(rgb) : "#ffffff";
  }

  private _getRgbFromAttributes(attrs: Record<string, any>): RGB | null {
    if (Array.isArray(attrs.rgb_color) && attrs.rgb_color.length >= 3) {
      const [r, g, b] = attrs.rgb_color;
      return { r, g, b };
    }
    if (Array.isArray(attrs.hs_color) && attrs.hs_color.length >= 2) {
      const [h, s] = attrs.hs_color;
      return this._hsToRgb(h, s);
    }
    return null;
  }

  private _hsToRgb(h: number, s: number): RGB {
    const saturation = s / 100;
    const value = 1;
    const c = value * saturation;
    const hh = h / 60;
    const x = c * (1 - Math.abs((hh % 2) - 1));
    let r1 = 0;
    let g1 = 0;
    let b1 = 0;

    if (hh >= 0 && hh < 1) {
      r1 = c;
      g1 = x;
    } else if (hh >= 1 && hh < 2) {
      r1 = x;
      g1 = c;
    } else if (hh >= 2 && hh < 3) {
      g1 = c;
      b1 = x;
    } else if (hh >= 3 && hh < 4) {
      g1 = x;
      b1 = c;
    } else if (hh >= 4 && hh < 5) {
      r1 = x;
      b1 = c;
    } else if (hh >= 5 && hh < 6) {
      r1 = c;
      b1 = x;
    }

    const m = value - c;
    return {
      r: Math.round((r1 + m) * 255),
      g: Math.round((g1 + m) * 255),
      b: Math.round((b1 + m) * 255)
    };
  }

  private _rgbToHex({ r, g, b }: RGB): string {
    const toHex = (v: number) => v.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  private _hexToRgb(hex: string): RGB | null {
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!match) return null;
    return {
      r: parseInt(match[1], 16),
      g: parseInt(match[2], 16),
      b: parseInt(match[3], 16)
    };
  }

  private _onBrightnessChange(ev: Event | CustomEvent): void {
    const detailValue =
      (ev as CustomEvent).detail && (ev as CustomEvent).detail.value;
    const target = ev.target as HTMLInputElement | null;
    const value =
      typeof detailValue === "number"
        ? detailValue
        : target
        ? Number(target.value)
        : 0;
    this._brightnessPct = value;
    this._callService({ brightness_pct: value, transition: 0.2 });
  }

  private _onColorTempChange(ev: Event | CustomEvent): void {
    const detailValue =
      (ev as CustomEvent).detail && (ev as CustomEvent).detail.value;
    const target = ev.target as HTMLInputElement | null;
    const value =
      typeof detailValue === "number"
        ? detailValue
        : target
        ? Number(target.value)
        : 0;
    this._colorTemp = value;
    this._callService({ color_temp_kelvin: value, transition: 0.2 });
  }

  private _onColorChange(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const hex = target.value;
    this._colorHex = hex;
    const rgb = this._hexToRgb(hex);
    if (!rgb) return;
    this._callService({
      rgb_color: [rgb.r, rgb.g, rgb.b],
      transition: 0.2
    });
  }

  private _togglePower(): void {
    if (!this._entity) return;
    this.hass.callService("light", "toggle", {
      entity_id: this._entity.entity_id
    });
  }

  private _callService(data: Record<string, any>): void {
    if (!this._entity) return;
    this.hass.callService("light", "turn_on", {
      entity_id: this._entity.entity_id,
      ...data
    });
  }

  private _supportsColorTemp(entity: HomeAssistantEntityState): boolean {
    const attrs = entity.attributes;
    if (
      typeof attrs.color_temp_kelvin === "number" ||
      typeof attrs.color_temp === "number"
    ) {
      return true;
    }
    const modes = attrs.supported_color_modes as string[] | undefined;
    return Array.isArray(modes) && modes.includes("color_temp");
  }

  private _supportsColor(entity: HomeAssistantEntityState): boolean {
    const attrs = entity.attributes;
    if (attrs.rgb_color || attrs.hs_color) return true;
    const modes = attrs.supported_color_modes as string[] | undefined;
    if (!Array.isArray(modes)) return false;
    return modes.some((m) => ["hs", "rgb", "rgbw", "rgbww", "xy"].includes(m));
  }

  protected render() {
    const entity = this._entity;
    if (!this._config) {
      return html`<div class="wrapper">Missing config</div>`;
    }

    if (!entity) {
      return html`<div class="wrapper">
        <div class="header">
          <div class="title">${this._config.entity}</div>
        </div>
        <div class="message">Entity not found</div>
      </div>`;
    }

    const attrs = entity.attributes;
    const name = attrs.friendly_name || entity.entity_id;
    const isOn = entity.state === "on";

    const minKelvin =
      typeof attrs.min_color_temp_kelvin === "number"
        ? attrs.min_color_temp_kelvin
        : typeof attrs.max_mireds === "number"
        ? Math.round(1_000_000 / attrs.max_mireds)
        : 2700;
    const maxKelvin =
      typeof attrs.max_color_temp_kelvin === "number"
        ? attrs.max_color_temp_kelvin
        : typeof attrs.min_mireds === "number"
        ? Math.round(1_000_000 / attrs.min_mireds)
        : 6500;

    const showColorTemp =
      this._config.show_color_temp !== false && this._supportsColorTemp(entity);
    const showColor =
      this._config.show_color !== false && this._supportsColor(entity);

    return html`<div class="wrapper">
      <div class="header">
        <div class="title">${name}</div>
        <div class="subtitle">${isOn ? "On" : "Off"}</div>
        <button class="power" @click=${this._togglePower}>
          ${isOn ? "Turn off" : "Turn on"}
        </button>
      </div>
      <div class="content">
        ${showColorTemp
          ? html`<div class="column">
              <div class="label">
                ${this._config.color_temp_label ?? "Teplota"}
              </div>
              <div class="slider-wrapper">
                <ha-control-slider
                  .value=${this._colorTemp ?? (minKelvin + maxKelvin) / 2}
                  .min=${minKelvin}
                  .max=${maxKelvin}
                  step="50"
                  mode="start"
                  vertical
                  show-handle
                  tooltip-position="right"
                  unit="K"
                  @value-changed=${this._onColorTempChange}
                ></ha-control-slider>
              </div>
              <div class="value">
                ${this._colorTemp != null ? `${this._colorTemp} K` : nothing}
              </div>
            </div>`
          : nothing}

        <div class="column brightness-column">
          <div class="label">
            ${this._config.brightness_label ?? "Jas"}
          </div>
          <div class="slider-wrapper">
            <ha-control-slider
              .value=${this._brightnessPct ?? (isOn ? 100 : 0)}
              min="1"
              max="100"
              step="1"
              mode="start"
              vertical
              show-handle
              tooltip-position="left"
              unit="%"
              @value-changed=${this._onBrightnessChange}
            ></ha-control-slider>
          </div>
          <div class="value">
            ${this._brightnessPct != null ? `${this._brightnessPct}%` : nothing}
          </div>
        </div>

        ${showColor
          ? html`<div class="column">
              <div class="label">
                ${this._config.color_label ?? "Barva"}
              </div>
              <div class="color-wrapper">
                <input
                  class="color-input"
                  type="color"
                  .value=${this._colorHex ?? "#ffffff"}
                  @change=${this._onColorChange}
                />
              </div>
            </div>`
          : nothing}
      </div>
    </div>`;
  }

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        sans-serif;
      color: var(--primary-text-color, #ffffff);
    }

    .wrapper {
      background: var(--dialog-background-color, #202124);
      color: var(--primary-text-color, #ffffff);
      border-radius: 16px;
      padding: 16px;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      gap: 12px;
    }

    .title {
      font-size: 1.1rem;
      font-weight: 600;
    }

    .subtitle {
      font-size: 0.9rem;
      opacity: 0.8;
    }

    .power {
      border: none;
      border-radius: 999px;
      padding: 6px 14px;
      background: var(--accent-color, #03a9f4);
      color: #ffffff;
      font-size: 0.85rem;
      cursor: pointer;
    }

    .power:hover {
      filter: brightness(1.1);
    }

    .content {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      align-items: center;
      justify-items: center;
    }

    .column {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .label {
      font-size: 0.9rem;
      opacity: 0.9;
    }

    .value {
      font-size: 0.8rem;
      opacity: 0.7;
    }

    .slider-wrapper {
      height: 220px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .color-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 180px;
    }

    .color-input {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: none;
      padding: 0;
      background: none;
      cursor: pointer;
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
    }

    .message {
      margin-top: 16px;
      font-size: 0.9rem;
      opacity: 0.8;
    }

    @media (max-width: 600px) {
      .content {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }

      .slider-wrapper {
        height: 150px;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "light-entity-dialog": LightEntityDialog;
  }
}

// Lovelace card registration
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).customCards = (window as any).customCards || [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).customCards.push({
  type: "light-entity-dialog",
  name: "Light Entity Dialog",
  description:
    "Custom dialog/card for Home Assistant lights with brightness, color temperature and color controls in three columns."
});

