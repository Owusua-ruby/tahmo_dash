// src/App.tsx

import React, { useEffect, useState } from 'react';
import StationList from './components/StationList';
import WeatherDataDisplay from './components/WeatherDataDisplay';
import { WeatherStation, WeatherData } from './types';
import { getStations, getWeatherData } from './services/api';
import { Box, Typography } from '@mui/material';

const App: React.FC = () => {
  const [stations, setStations] = useState<WeatherStation[]>([]);
  const [selectedStationId, setSelectedStationId] = useState<string>();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all stations
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const stationsData = await getStations();
        setStations(stationsData);
      } catch (err) {
        console.error(err);
        setError('Error loading stations');
      }
    };

    fetchStations();
  }, []);

  // Fetch weather for selected station
  useEffect(() => {
    if (!selectedStationId) {
      console.log('No station selected');
      return;
    }

    const selectedStation = stations.find(s => s.id === selectedStationId);
    if (!selectedStation) {
      console.log('Selected station not found:', selectedStationId);
      return;
    }

    const fetchWeatherData = async () => {
      console.log('Fetching weather for:', selectedStation);
      setLoading(true);
      setError(null);
      setWeatherData(null); // Clear previous data

      try {
        const apiResponse = await getWeatherData(selectedStation.id, selectedStation.name);
        console.log('API Response:', apiResponse);
        
        // Transform the API response to WeatherData format
        if (apiResponse.status === 'success' && apiResponse.data?.observations) {
          const obs = apiResponse.data.observations;
          console.log('Observations:', obs);
          
          const weatherData: WeatherData = {
            timestamp: obs.last_report,
            temperature: obs.values.te,
            humidity: obs.values.rh * 100, // Convert from decimal to percentage
            rainfall: obs.values.pr,
            windSpeed: obs.values.ws,
            windDirection: obs.values.wd,
            // Additional weather data
            airPressure: obs.values.ap,
            solarRadiation: obs.values.ra,
            windGust: obs.values.wg,
          };
          
          console.log('Transformed weather data:', weatherData);
          setWeatherData(weatherData);
        } else {
          console.error('Invalid API response structure:', apiResponse);
          throw new Error('Invalid weather data format');
        }
      } catch (err: any) {
        console.error('Weather fetch error:', err);
        if (err.response?.status === 500) {
          setError('No weather data available for this station');
        } else {
          setError(`${err.message}`);
        }
      } finally {
        console.log('Weather fetch completed');
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedStationId, stations]);

  return (
  
    <Box sx={{ display: 'flex', gap: 4, padding: 4 }}>
      <StationList
        stations={stations}
        selectedStationId={selectedStationId}
        onStationSelect={setSelectedStationId}
      />
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" gutterBottom>Weather Station Dashboard</Typography>
        <WeatherDataDisplay
          station={stations.find(s => s.id === selectedStationId)}
          weatherData={weatherData}
          loading={loading}
          error={error}
        />
      </Box>
    </Box>
  );
};

export default App;