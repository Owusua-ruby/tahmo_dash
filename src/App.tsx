// src/App.tsx

import React, { useEffect, useState } from 'react';
import StationList from './components/StationList';
import WeatherDataDisplay from './components/WeatherDataDisplay';
import { WeatherStation, WeatherApiResponse, WeatherData } from './types';
import { Box, Typography } from '@mui/material';

const App: React.FC = () => {
  const [stations, setStations] = useState<WeatherStation[]>([]);
  const [selectedStationId, setSelectedStationId] = useState<string>();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all stations
  useEffect(() => {
    fetch('http://localhost:8000/api/get-stations')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch stations');
        return res.json();
      })
      .then(setStations)
      .catch((err) => {
        console.error(err);
        setError('Error loading stations');
      });
  }, []);

  // Fetch weather for selected station
  useEffect(() => {
    if (!selectedStationId) return;

    setLoading(true);
    setError(null);

    fetch(`http://localhost:8000/api/get-weather/${selectedStationId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch weather data');
        return res.json();
      })
      .then(setWeatherData)
      .catch((err) => {
        console.error(err);
        setError('Error loading weather data');
      })
      .finally(() => setLoading(false));
  }, [selectedStationId]);

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



// import React, { useEffect, useState } from 'react';
// import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
// import { getStations, getWeatherData } from './services/api';
// import { WeatherStation, WeatherData } from './types';
// import StationList from './components/StationList';
// import Map from './components/Map';
// import WeatherDataDisplay from './components/WeatherDataDisplay';

// const theme = createTheme({
//   palette: {
//     primary: { main: '#1976d2' },
//     secondary: { main: '#dc004e' },
//     background: { default: '#f5f5f5' },
//   },
// });

// function App() {
//   const [stations, setStations] = useState<WeatherStation[]>([]);
//   const [selectedStation, setSelectedStation] = useState<WeatherStation | null>(null);
//   const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchStations = async () => {
//       setLoading(true);
//       try {
//         const data = await getStations();
//         setStations(data);
//       } catch (err) {
//         setError('Failed to fetch stations');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStations();
//   }, []);

//   useEffect(() => {
//     if (!selectedStation) return;
//     const fetchWeather = async () => {
//       setLoading(true);
//       try {
//         const data = await getWeatherData(selectedStation.id);
//         setWeatherData(data);
//       } catch (err) {
//         setError('Failed to fetch weather data');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWeather();
//   }, [selectedStation]);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ display: 'flex', height: '100vh' }}>
//         <StationList 
//           stations={stations} 
//           selectedStationId={selectedStation?.id} 
//           onStationSelect={(id) => {
//             const station = stations.find(s => s.id === id) || null;
//             setSelectedStation(station);
//           }} 
//         />
//         <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//           <Map 
//             stations={stations} 
//             selectedStation={selectedStation} 
//             onSelectStation={setSelectedStation} 
//           />
//           {selectedStation && (
//             <WeatherDataDisplay 
//               station={selectedStation} 
//               weatherData={weatherData} 
//               loading={loading} 
//               error={error} 
//             />
//           )}
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default App;