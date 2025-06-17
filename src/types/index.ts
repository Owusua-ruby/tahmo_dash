export interface WeatherStation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  lastUpdate?: string;
  measurements?: {
    temperature?: number;
    humidity?: number;
    rainfall?: number;
    windSpeed?: number;
    windDirection?: number;
  };
}


export interface WeatherApiResponse {
  status: "success";
  data: {
    observations: {
      status: number;
      name: string;
      latitude: number;
      longitude: number;
      altitude: number;
      installation_height: number;
      timezone: string;
      values: {
        ap: number; // Air Pressure
        pr: number; // Precipitation
        ra: number; // Solar Radiation
        rh: number; // Relative Humidity
        te: number; // Temperature
        wd: number; // Wind Direction
        wg: number; // Wind Gust
        ws: number; // Wind Speed
      };
      last_report: string; // ISO date string
      code: string;
      station_local_reported_time: string;
      utc_reported_time: string;
    };
    forecasts: [string, number][]; // Array of [date string, rainfall amount]
  };
}


export interface WeatherData {
  timestamp: string;
  temperature?: number;
  humidity?: number;
  rainfall?: number;
  windSpeed?: number;
  windDirection?: number;
  airPressure?: number;
  solarRadiation?: number;
  windGust?: number;
}