import axios from 'axios';
import { WeatherStation, WeatherApiResponse } from '../types';

// Create a reusable Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch the list of weather stations
export const getStations = async (): Promise<WeatherStation[]> => {
  const response = await api.get('/get-stations');
console.log('Gig', response)
  // Assuming backend returns: [["TA00001", "Lela Primary School", 1.2345, 2.3456], ...]
  return response.data.map(
    ([id, name, latitude, longitude]: [string, string, number, number]) => ({
      id: `${id} | ${name}`,
      name,
      latitude,
      longitude,
      lastUpdate: null,
    })
  );
};

// http://localhost:8000/api/data?station=TA00001%20%7C%20Lela%20Primary%20School
// Fetch weather data for a given station
export const getWeatherData = async (stationId: string): Promise<WeatherApiResponse> => {
  console.log('nose', stationId)
  // stationId = "TA00001 | Lela Primary School"
  const id = stationId.split(' | ')[0]; // Extract only "TA00001"
  const name= stationId.split(' | ')[1]

  const response = await api.get(`/data?station=${id} | ${name}`);
  // console.log(response)
  return response.data;
};











// import axios from 'axios';
// import { WeatherStation, WeatherData } from '../types';

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
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