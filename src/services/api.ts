import axios from 'axios';
import { WeatherStation, WeatherApiResponse } from '../types';

// Create a reusable Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://6ddrtwwz-8000.uks1.devtunnels.ms/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch the list of weather stations
export const getStations = async (): Promise<WeatherStation[]> => {
  const response = await api.get('/get-stations');
  console.log('API Response:', response.data);
  
  // Backend returns: [["TA00001", "Lela Primary School", -1.1232833, 34.3979917], ...]
  return response.data.map(
    ([id, name, latitude, longitude]: [string, string, number, number]) => ({
      id,
      name,
      latitude,
      longitude,
      lastUpdate: null,
    })
  );
};

// Fetch weather data for a given station
export const getWeatherData = async (stationId: string, stationName: string): Promise<WeatherApiResponse> => {
  console.log('Fetching weather for station:', stationId, stationName);
  
  // Backend expects format: "TA00004 | Manso Amenfi NVTI"
  const stationParam = `${stationId} | ${stationName}`;
  const response = await api.get(`/data?station=${encodeURIComponent(stationParam)}`);
  console.log('Weather data response:', response.data);
  return response.data;
};











// import axios from 'axios';
// import { WeatherStation, WeatherData } from '../types';

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || 'https://6ddrtwwz-8000.uks1.devtunnels.ms/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const getStations = async (): Promise<WeatherStation[]> => {
//   const response = await api.get('/stations');
//   return response.data;
// };

// export const getWeatherData = async (stationId: string): Promise<WeatherData> => {
//   const response = await api.get(`/stations/${stationId}/weather`);
//   return response.data;
// };