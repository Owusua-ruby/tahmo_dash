import React from 'react';
import { WeatherStation, WeatherData } from '../types';
import WeatherDataDisplay from '../components/WeatherDataDisplay';
import Map from '../components/Map';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Container,
  Grid,
  Paper,
  IconButton,
  Avatar,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import { 
  ArrowBack, 
  LocationOn, 
  Schedule, 
  ThermostatAuto,
  SignalCellularAlt,
  Height,
  Public,
  CheckCircle,
  Cancel,
  Refresh
} from '@mui/icons-material';

interface StationDataPageProps {
    station: WeatherStation | undefined;
    weatherData: WeatherData | null;
    loading: boolean;
    error: string | null;
    onBackToStations: () => void;
}

const StationDataPage: React.FC<StationDataPageProps> = ({
    station,
    weatherData,
    loading,
    error,
    onBackToStations,
}) => {
    if (!station) {
        return (
            <Box>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    onClick={onBackToStations}
                    sx={{ mb: 2 }}
                >
                    Back to Stations
                </Button>
                <Typography variant="h6">No station selected</Typography>
            </Box>
        );
    }

    return (
        <Box>
            {/* Header with Back Button */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    onClick={onBackToStations}
                >
                    Back to Stations
                </Button>
                <Box>
                    <Typography variant="h4">
                        {station.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Station ID: {station.id}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Station Information and Time Information Row */}
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    {/* Station Information Card */}
                    <Box sx={{ flex: 1, minWidth: 300 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    <LocationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    Station Information
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" color="text.secondary">Location:</Typography>
                                        <Typography variant="body2">
                                            {station.latitude?.toFixed(6)}, {station.longitude?.toFixed(6)}
                                        </Typography>
                                    </Box>
                                    {weatherData?.altitude && (
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Altitude:</Typography>
                                            <Typography variant="body2">{weatherData.altitude}m</Typography>
                                        </Box>
                                    )}
                                    {weatherData?.installation_height && (
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Installation Height:</Typography>
                                            <Typography variant="body2">{weatherData.installation_height}m</Typography>
                                        </Box>
                                    )}
                                    {weatherData?.timezone && (
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Timezone:</Typography>
                                            <Typography variant="body2">{weatherData.timezone}</Typography>
                                        </Box>
                                    )}
                                    {weatherData?.status !== undefined && (
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Status:</Typography>
                                            <Chip
                                                label={weatherData.status === 1 ? "Active" : "Inactive"}
                                                color={weatherData.status === 1 ? "success" : "error"}
                                                size="small"
                                            />
                                        </Box>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Time Information Card */}
                    <Box sx={{ flex: 1, minWidth: 300 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    <Schedule sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    Last Update
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    {weatherData?.timestamp && (
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">UTC Time:</Typography>
                                            <Typography variant="body2">
                                                {new Date(weatherData.timestamp).toLocaleString()}
                                            </Typography>
                                        </Box>
                                    )}
                                    {weatherData?.station_local_reported_time && (
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">Local Time:</Typography>
                                            <Typography variant="body2">{weatherData.station_local_reported_time}</Typography>
                                        </Box>
                                    )}
                                    {weatherData?.utc_reported_time && (
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2" color="text.secondary">UTC Reported:</Typography>
                                            <Typography variant="body2">{weatherData.utc_reported_time}</Typography>
                                        </Box>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>

                {/* Map */}
                <Box>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Station Location
                            </Typography>
                            <Box sx={{ height: 400 }}>
                                <Map
                                    stations={[station]}
                                    selectedStation={station}
                                    onSelectStation={() => { }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Weather Data */}
                <Box>
                    <Typography variant="h6" gutterBottom>
                        <ThermostatAuto sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Current Weather Conditions
                    </Typography>
                    <WeatherDataDisplay
                        station={station}
                        weatherData={weatherData}
                        loading={loading}
                        error={error}
                    />
                </Box>

                {/* Forecasts */}
                {weatherData?.forecasts && weatherData.forecasts.length > 0 && (
                    <Box>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    7-Day Rainfall Forecast
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {weatherData.forecasts.map(([date, rainfall]) => (
                                        <Box key={date} sx={{ minWidth: 120, flex: '1 1 auto', maxWidth: 150 }}>
                                            <Card variant="outlined">
                                                <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {new Date(date).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </Typography>
                                                    <Typography variant="h6" color="primary">
                                                        {rainfall}mm
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default StationDataPage;
