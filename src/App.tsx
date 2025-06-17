// src/App.tsx

import React, { useEffect, useState } from 'react';
import StationList from './components/StationList';
import WeatherDataDisplay from './components/WeatherDataDisplay';
import { WeatherStation, WeatherData } from './types';
import { Box, Typography } from '@mui/material';

const App: React.FC = () => {
  const [stations, setStations] = useState<WeatherStation[]>([]);
  const [selectedStationId, setSelectedStationId] = useState<string>();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all stations
  useEffect(() => {
    fetch('https://6ddrtwwz-8000.uks1.devtunnels.ms/api/get-stations')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch stations');
        return res.json();
      })
      .then((data) => {
        // Transform the array of arrays into WeatherStation objects
        const transformedStations = data.map(
          ([id, name, latitude, longitude]: [string, string, number, number]) => ({
            id,
            name,
            latitude,
            longitude,
            lastUpdate: null,
          })
        );
        setStations(transformedStations);
      })
      .catch((err) => {
        console.error(err);
        setError('Error loading stations');
      });
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

    console.log('Fetching weather for:', selectedStation);
    setLoading(true);
    setError(null);
    setWeatherData(null); // Clear previous data

    // Create the station parameter format expected by backend
    const stationParam = `${selectedStation.id} | ${selectedStation.name}`;
    const requestUrl = `https://6ddrtwwz-8000.uks1.devtunnels.ms/api/data?station=${encodeURIComponent(stationParam)}`;
    
    console.log('Making request to:', requestUrl);
    console.log('Station param:', stationParam);
    
    fetch(requestUrl)
      .then((res) => {
        console.log('Response status:', res.status);
        
        if (res.status === 500) {
          // Handle 500 errors specifically (likely no data available)
          throw new Error('No weather data available for this station');
        }
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        return res.json();
      })
      .then((apiResponse) => {
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
      })
      .catch((err) => {
        console.error('Weather fetch error:', err);
        setError(`${err.message}`);
      })
      .finally(() => {
        console.log('Weather fetch completed');
        setLoading(false);
      });
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