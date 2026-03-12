import { LitElement, css, html, nothing, PropertyValues } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
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
  private _hassInternal!: HomeAssistant;

  @state() private _config!: LightEntityDialogConfig;
  @state() private _brightnessPct: number | null = null;
  @state() private _colorTemp: number | null = null;
  
  // Native color picker state
  @state() private _currentHue: number = 0; // 0-360
  @state() private _markerX: number = 0; // 0-100 percentage
  @state() private _markerY: number = 0; // 0-100 percentage
  
  @query(".color-gradient") private _gradientArea!: HTMLDivElement;

  private _colorDebounceTimer: number | null = null;
  private _draggingColor = false;

  private _boundOnDrag: (e: MouseEvent | TouchEvent) => void;
  private _boundOnDragEnd: () => void;

  constructor() {
    super();
    this._boundOnDrag = this._onDragColor.bind(this);
    this._boundOnDragEnd = this._onDragEnd.bind(this);
  }

  setConfig(config: LightEntityDialogConfig): void {
    if (!config || !config.entity) {
      throw new Error("Entity must be specified");
    }
    this._config = config;
  }

  @property({ attribute: false })
  set hass(hass: HomeAssistant) {
    this._hassInternal = hass;
    this._updateFromEntity();
  }

  get hass(): HomeAssistant {
    return this._hassInternal;
  }

  private get _entity(): HomeAssistantEntityState | undefined {
    if (!this.hass || !this._config) {
      return undefined;
    }
    return this.hass.states[this._config.entity];
  }

  private _updateFromEntity(): void {
    const entity = this._entity;
    if (!entity) return;

    const attrs = entity.attributes;

    if (attrs.brightness != null) {
      this._brightnessPct = Math.round((attrs.brightness / 255) * 100);
    } else {
      this._brightnessPct = null;
    }

    if (typeof attrs.color_temp_kelvin === "number") {
      this._colorTemp = attrs.color_temp_kelvin;
    } else if (typeof attrs.color_temp === "number") {
      this._colorTemp = Math.round(1_000_000 / attrs.color_temp);
    } else {
      this._colorTemp = null;
    }

    // Only update native picker state if user is NOT currently dragging
    if (!this._draggingColor) {
      const rgb = this._getRgbFromAttributes(attrs);
      if (rgb) {
        this._setPickerFromRgb(rgb.r, rgb.g, rgb.b);
      }
    }
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
    let r1 = 0, g1 = 0, b1 = 0;

    if (hh >= 0 && hh < 1) { r1 = c; g1 = x; }
    else if (hh >= 1 && hh < 2) { r1 = x; g1 = c; }
    else if (hh >= 2 && hh < 3) { g1 = c; b1 = x; }
    else if (hh >= 3 && hh < 4) { g1 = x; b1 = c; }
    else if (hh >= 4 && hh < 5) { r1 = x; b1 = c; }
    else if (hh >= 5 && hh < 6) { r1 = c; b1 = x; }

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

  private _rgbToHsv(r: number, g: number, b: number) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: h * 360, s: s * 100, v: v * 100 };
  }

  private _setPickerFromRgb(r: number, g: number, b: number) {
    const hsv = this._rgbToHsv(r, g, b);
    this._currentHue = hsv.h;
    this._markerX = hsv.s;
    this._markerY = 100 - hsv.v;
  }

  private _kelvinToRgb(kelvin: number): RGB {
    const temp = Math.max(1000, Math.min(40000, kelvin)) / 100;
    let r, g, b;

    if (temp <= 66) {
      r = 255;
      g = 99.4708025861 * Math.log(temp) - 161.1195681661;
      b = temp <= 19 ? 0 : 138.5177312231 * Math.log(temp - 10) - 305.0447927307;
    } else {
      r = 329.698727446 * Math.pow(temp - 60, -0.1332047592);
      g = 288.1221695283 * Math.pow(temp - 60, -0.0755148492);
      b = 255;
    }
    const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
    return { r: clamp(r), g: clamp(g), b: clamp(b) };
  }

  private _kelvinToHex(kelvin: number): string {
    return this._rgbToHex(this._kelvinToRgb(kelvin));
  }

  private _callService(data: Record<string, any>): void {
    if (!this._entity) return;
    this.hass.callService("light", "turn_on", {
      entity_id: this._entity.entity_id,
      ...data
    });
  }

  private _debouncedColorServiceCall(r: number, g: number, b: number) {
    if (this._colorDebounceTimer) {
      window.clearTimeout(this._colorDebounceTimer);
    }
    this._colorDebounceTimer = window.setTimeout(() => {
      this._callService({ rgb_color: [r, g, b], transition: 0.2 });
    }, 150);
  }

  private _onBrightnessChange(ev: CustomEvent): void {
    const value = ev.detail && typeof ev.detail.value === "number" 
      ? ev.detail.value 
      : Number((ev.target as HTMLInputElement).value);
      
    this._brightnessPct = value;
    this._callService({ brightness_pct: value, transition: 0.2 });
  }

  private _onColorTempChange(ev: CustomEvent): void {
    const value = ev.detail && typeof ev.detail.value === "number" 
      ? ev.detail.value 
      : Number((ev.target as HTMLInputElement).value);

    this._colorTemp = value;
    this._callService({ color_temp_kelvin: value, transition: 0.2 });
  }

  // Native Picker Handlers
  private _hsvToRgb(h: number, s: number, v: number): RGB {
    let r = 0, g = 0, b = 0;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }

  private _updateColorFromPicker() {
    const s = this._markerX / 100;
    const v = (100 - this._markerY) / 100;
    const { r, g, b } = this._hsvToRgb(this._currentHue / 360, s, v);
    this._debouncedColorServiceCall(r, g, b);
  }

  private _startDragColor(e: MouseEvent | TouchEvent) {
    this._draggingColor = true;
    document.addEventListener("mousemove", this._boundOnDrag);
    document.addEventListener("touchmove", this._boundOnDrag, { passive: false });
    document.addEventListener("mouseup", this._boundOnDragEnd);
    document.addEventListener("touchend", this._boundOnDragEnd);
    this._onDragColor(e);
  }

  private _onDragColor(e: MouseEvent | TouchEvent) {
    if (!this._gradientArea) return;
    if (e.cancelable) e.preventDefault();
    
    const rect = this._gradientArea.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }

    let x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    let y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

    this._markerX = x * 100;
    this._markerY = y * 100;
    this._updateColorFromPicker();
  }

  private _onDragEnd() {
    this._draggingColor = false;
    document.removeEventListener("mousemove", this._boundOnDrag);
    document.removeEventListener("touchmove", this._boundOnDrag);
    document.removeEventListener("mouseup", this._boundOnDragEnd);
    document.removeEventListener("touchend", this._boundOnDragEnd);
  }

  private _onHueInput(e: Event) {
    const val = Number((e.target as HTMLInputElement).value);
    this._currentHue = val;
    this._updateColorFromPicker();
  }

  private _pickSwatch(hex: string) {
    const rgb = this._hexToRgb(hex);
    if (rgb) {
      this._setPickerFromRgb(rgb.r, rgb.g, rgb.b);
      this._callService({ rgb_color: [rgb.r, rgb.g, rgb.b], transition: 0.2 });
    }
  }

  private _togglePower(): void {
    if (!this._entity) return;
    this.hass.callService("light", "toggle", {
      entity_id: this._entity.entity_id
    });
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

    const modes = attrs.supported_color_modes as string[] | undefined;
    const supportsColorTemp = (typeof attrs.color_temp_kelvin === "number" || typeof attrs.color_temp === "number") || (Array.isArray(modes) && modes.includes("color_temp"));
    const supportsColor = (attrs.rgb_color || attrs.hs_color) || (Array.isArray(modes) && modes.some((m) => ["hs", "rgb", "rgbw", "rgbww", "xy"].includes(m)));

    const showColorTemp = this._config.show_color_temp !== false && supportsColorTemp;
    const showColor = this._config.show_color !== false && supportsColor;

    const minKelvin = attrs.min_color_temp_kelvin || (attrs.max_mireds ? Math.round(1_000_000 / attrs.max_mireds) : 2700);
    const maxKelvin = attrs.max_color_temp_kelvin || (attrs.min_mireds ? Math.round(1_000_000 / attrs.min_mireds) : 6500);

    const tempValue = this._colorTemp ?? (minKelvin + maxKelvin) / 2;
    const tempColor = this._kelvinToHex(tempValue);

    const swatches = [
      "#ff0000", "#ff8000", "#ffff00", "#80ff00",
      "#00ff00", "#00ff80", "#00ffff", "#0080ff",
      "#0000ff", "#8000ff", "#ff00ff", "#ff0080",
      "#ffffff"
    ];

    return html`<div class="wrapper">
      <div class="header">
        <div class="title">${name}</div>
        <div class="subtitle">${isOn ? "On" : "Off"}</div>
        <button class="power" @click=${this._togglePower}>
          ${isOn ? "Turn off" : "Turn on"}
        </button>
      </div>

      <div class="sliders-row">
        ${showColorTemp
          ? html`<div class="column color-temp-column">
              <div class="label">${this._config.color_temp_label ?? "Teplota"}</div>
              <div class="slider-wrapper">
                <ha-control-slider
                  .value=${tempValue}
                  .min=${minKelvin}
                  .max=${maxKelvin}
                  step="50"
                  mode="start"
                  vertical
                  show-handle
                  unit="K"
                  style=${`--control-slider-color: ${tempColor};`}
                  @value-changed=${this._onColorTempChange}
                >
                  <div slot="background" class="ct-background" 
                       style=${`background: linear-gradient(to top, ${this._kelvinToHex(minKelvin)}, ${this._kelvinToHex(maxKelvin)});`}>
                  </div>
                </ha-control-slider>
              </div>
              <div class="value">${this._colorTemp != null ? `${this._colorTemp} K` : nothing}</div>
            </div>`
          : nothing}

        <div class="column brightness-column">
          <div class="label">${this._config.brightness_label ?? "Jas"}</div>
          <div class="slider-wrapper">
            <ha-control-slider
              .value=${this._brightnessPct ?? (isOn ? 100 : 0)}
              min="1" max="100" step="1"
              mode="start" vertical show-handle unit="%"
              @value-changed=${this._onBrightnessChange}
            ></ha-control-slider>
          </div>
          <div class="value">${this._brightnessPct != null ? `${this._brightnessPct}%` : nothing}</div>
        </div>
      </div>

      ${showColor
        ? html`<div class="color-section">
            <div class="label">${this._config.color_label ?? "Barva"}</div>
            
            <div class="native-coloris-picker">
              <div class="color-gradient" 
                   style=${`background-color: hsl(${this._currentHue}, 100%, 50%)`}
                   @mousedown=${this._startDragColor}
                   @touchstart=${this._startDragColor}>
                <div class="gradient-white"></div>
                <div class="gradient-black"></div>
                <div class="color-marker" style=${`left: ${this._markerX}%; top: ${this._markerY}%`}></div>
              </div>
              
              <div class="hue-slider-wrap">
                 <input type="range" class="hue-slider" min="0" max="360" 
                        .value=${this._currentHue} 
                        @input=${this._onHueInput} />
              </div>
            
              <div class="swatches">
                 ${swatches.map(c => html`<button style="background: ${c}" @click=${() => this._pickSwatch(c)}></button>`)}
              </div>
            </div>

          </div>`
        : nothing}
    </div>`;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        box-sizing: border-box;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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

      .title { font-size: 1.1rem; font-weight: 600; }
      .subtitle { font-size: 0.9rem; opacity: 0.8; }

      .power {
        border: none;
        border-radius: 999px;
        padding: 6px 14px;
        background: var(--accent-color, #03a9f4);
        color: #ffffff;
        font-size: 0.85rem;
        cursor: pointer;
      }

      .power:hover { filter: brightness(1.1); }

      .sliders-row {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        justify-items: center;
        align-items: center;
        width: 100%;
        margin-bottom: 24px;
        padding: 0 16px; /* give some outer margin */
        box-sizing: border-box;
      }

      .color-temp-column {
        grid-column: 1 / 2;
        justify-self: start;
      }

      .brightness-column {
        grid-column: 2 / 3;
      }

      .brightness-column ha-control-slider {
        --control-slider-thickness: 80px;
        --control-slider-border-radius: 24px;
      }

      .column {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .label { font-size: 0.9rem; opacity: 0.9; }
      .value { font-size: 0.8rem; opacity: 0.7; }

      .slider-wrapper {
        height: 220px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .ct-background {
        border-radius: var(--control-slider-border-radius);
        opacity: 0.35;
      }

      .color-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        width: 100%;
      }

      /* Native Color Picker imitating Coloris */
      .native-coloris-picker {
        width: 100%;
        background: transparent;
        display: flex;
        flex-direction: column;
      }

      .color-gradient {
        width: 100%;
        height: 140px;
        position: relative;
        border-radius: 8px 8px 0 0;
        cursor: crosshair;
        overflow: hidden;
        touch-action: none;
      }
      
      .gradient-white {
        position: absolute; inset: 0; 
        background: linear-gradient(to right, #fff, rgba(255,255,255,0));
        pointer-events: none;
      }
      
      .gradient-black {
        position: absolute; inset: 0; 
        background: linear-gradient(to top, #000, rgba(0,0,0,0));
        pointer-events: none;
      }
      
      .color-marker {
        position: absolute;
        width: 12px; height: 12px;
        border-radius: 50%;
        border: 2px solid #fff;
        transform: translate(-50%, -50%);
        pointer-events: none;
        box-shadow: 0 0 2px rgba(0,0,0,0.5);
        z-index: 2;
      }

      .hue-slider-wrap {
        margin: 14px 10px;
      }
      
      .hue-slider {
        width: 100%;
        height: 12px;
        -webkit-appearance: none;
        appearance: none;
        background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
        border-radius: 6px;
        outline: none;
        margin: 0;
      }
      
      .hue-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 18px; height: 18px;
        border-radius: 50%;
        background: #fff;
        border: 1px solid #ccc;
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        cursor: grab;
      }
      .hue-slider::-moz-range-thumb {
        width: 18px; height: 18px;
        border-radius: 50%;
        background: #fff;
        border: 1px solid #ccc;
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        cursor: grab;
      }

      .swatches { 
        display: flex; 
        flex-wrap: wrap; 
        gap: 8px; 
        margin: 0 6px 12px 6px; 
      }
      
      .swatches button { 
        width: 22px; 
        height: 22px; 
        border-radius: 4px; 
        border: none; 
        cursor: pointer; 
        padding: 0;
        box-shadow: 0 0 0 1px rgba(255,255,255,0.1); 
      }
      
      .swatches button:hover {
        transform: scale(1.1);
      }

      @media (max-width: 600px) {
        .sliders-row { gap: 16px; }
        .slider-wrapper { height: 150px; }
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "light-entity-dialog": LightEntityDialog;
  }
}

// Lovelace card registration
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "light-entity-dialog",
  name: "Light Entity Dialog",
  description: "Custom dialog for HA lights with native inline color picker."
});
