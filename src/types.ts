export interface LightEntityDialogConfig {
  entity: string;
  show_color_temp?: boolean;
  show_color?: boolean;
  min_mireds?: number;
  max_mireds?: number;
  brightness_label?: string;
  color_temp_label?: string;
  color_label?: string;
}

export interface HomeAssistantEntityState {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
}

export interface HomeAssistant {
  states: Record<string, HomeAssistantEntityState>;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, any>
  ): void;
}

