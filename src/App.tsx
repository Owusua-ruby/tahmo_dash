// src/App.tsx

import React, { useEffect, useState } from 'react';
import { WeatherStation, WeatherData } from './types';
import { getStations, getWeatherData } from './services/api';
import { StationsPage, StationDataPage } from './pages';
import { Box, CssBaseline, createTheme, ThemeProvider } from '@mui/material';

// Create a modern theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

const App: React.FC = () => {
  const [stations, setStations] = useState<WeatherStation[]>([]);
  const [selectedStationId, setSelectedStationId] = useState<string>();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Page navigation state
  const [currentPage, setCurrentPage] = useState<'stations' | 'station-data'>('stations');

  // Handle station selection and navigation to station data page
  const handleStationSelect = (stationId: string) => {
    setSelectedStationId(stationId);
    setCurrentPage('station-data');
  };

  // Handle going back to stations page
  const handleBackToStations = () => {
    setCurrentPage('stations');
    setSelectedStationId(undefined);
    setWeatherData(null);
  };

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
            // Station details
            altitude: obs.altitude,
            installation_height: obs.installation_height,
            timezone: obs.timezone,
            status: obs.status,
            code: obs.code,
            station_local_reported_time: obs.station_local_reported_time,
            utc_reported_time: obs.utc_reported_time,
            // Forecast data
            forecasts: apiResponse.data?.forecasts,
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        backgroundColor: 'background.default'
      }}>
        {currentPage === 'stations' ? (
          <StationsPage
            stations={stations}
            loading={loading}
            error={error}
            onStationSelect={handleStationSelect}
          />
        ) : (
          <StationDataPage
            station={stations.find(s => s.id === selectedStationId)}
            weatherData={weatherData}
            loading={loading}
            error={error}
            onBackToStations={handleBackToStations}
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default App;