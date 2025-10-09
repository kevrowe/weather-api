export interface Condition {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export interface Weather {
  id: number;
  timestamp: number;
  temp_min: number;
  temp_max: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  conditions: number;
  wind_speed: number;
  wind_degrees: number;
  wind_gust: number;
  precipitation: number;
}

export interface WeatherWithCondition extends Weather {
  condition_name: string;
  condition_description: string;
  condition_icon: string;
}
