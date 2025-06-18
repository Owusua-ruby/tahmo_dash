// src/components/WeatherDataDisplay.tsx

import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { WeatherStation, WeatherData } from '../../types';

interface WeatherDataDisplayProps {
  station: WeatherStation | undefined;
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const WeatherDataDisplay: React.FC<WeatherDataDisplayProps> = ({ station, weatherData, loading, error }) => {

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography>Loading...</Typography>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Typography color="error">{error}</Typography>
        </CardContent>
      </Card>
    );
  }
  if (!station) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Select a Station</Typography>
          <Typography color="textSecondary">
            Please select a weather station from the list to view its current conditions.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData && !loading && !error) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>{station.name}</Typography>
          <Typography color="textSecondary">
            Click on a station to load weather data.
          </Typography>
        </CardContent>
      </Card>
    );
  }  console.log('Weather data:', weatherData);
  
  // At this point, weatherData should not be null
  if (!weatherData) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>{station.name}</Typography>
          <Typography color="textSecondary">
            No weather data available for this station.
          </Typography>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card sx={{ flex: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {station.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Last Update: {weatherData.timestamp ? new Date(weatherData.timestamp).toLocaleString() : 'N/A'}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
          <Box sx={{ flex: '0 0 calc(33.33% - 8px)' }}>
            <Typography variant="body2" color="textSecondary">Temperature</Typography>
            <Typography variant="h6">{weatherData.temperature !== undefined ? `${weatherData.temperature}°C` : 'N/A'}</Typography>
          </Box>
          <Box sx={{ flex: '0 0 calc(33.33% - 8px)' }}>
            <Typography variant="body2" color="textSecondary">Humidity</Typography>
            <Typography variant="h6">{weatherData.humidity !== undefined ? `${weatherData.humidity.toFixed(1)}%` : 'N/A'}</Typography>
          </Box>
          <Box sx={{ flex: '0 0 calc(33.33% - 8px)' }}>
            <Typography variant="body2" color="textSecondary">Rainfall</Typography>
            <Typography variant="h6">{weatherData.rainfall !== undefined ? `${weatherData.rainfall}mm` : 'N/A'}</Typography>
          </Box>
          <Box sx={{ flex: '0 0 calc(33.33% - 8px)' }}>
            <Typography variant="body2" color="textSecondary">Wind Speed</Typography>
            <Typography variant="h6">{weatherData.windSpeed !== undefined ? `${weatherData.windSpeed}m/s` : 'N/A'}</Typography>
          </Box>
          <Box sx={{ flex: '0 0 calc(33.33% - 8px)' }}>
            <Typography variant="body2" color="textSecondary">Wind Direction</Typography>
            <Typography variant="h6">{weatherData.windDirection !== undefined ? `${weatherData.windDirection}°` : 'N/A'}</Typography>
          </Box>
          <Box sx={{ flex: '0 0 calc(33.33% - 8px)' }}>
            <Typography variant="body2" color="textSecondary">Air Pressure</Typography>
            <Typography variant="h6">{weatherData.airPressure !== undefined ? `${weatherData.airPressure}hPa` : 'N/A'}</Typography>
          </Box>
          <Box sx={{ flex: '0 0 calc(33.33% - 8px)' }}>
            <Typography variant="body2" color="textSecondary">Wind Gust</Typography>
            <Typography variant="h6">{weatherData.windGust !== undefined ? `${weatherData.windGust}m/s` : 'N/A'}</Typography>
          </Box>
          <Box sx={{ flex: '0 0 calc(33.33% - 8px)' }}>
            <Typography variant="body2" color="textSecondary">Solar Radiation</Typography>
            <Typography variant="h6">{weatherData.solarRadiation !== undefined ? `${weatherData.solarRadiation}W/m²` : 'N/A'}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherDataDisplay;