// src/components/WeatherDataDisplay.tsx

import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { WeatherApiResponse, WeatherStation, WeatherData } from '../../types';

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

  if (!station || !weatherData) {
    return (
      <Card>
        <CardContent>
          <Typography>No weather data available</Typography>
        </CardContent>
      </Card>
    );
  }
  console.log('food', weatherData)
  return (
    <Card sx={{ flex: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {station.name}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: '0 0 calc(50% - 8px)' }}>
            <Typography variant="body2" color="textSecondary">Temperature</Typography>
            <Typography variant="body1">{weatherData.temperature}</Typography>
          </Box>
          {/* <Box sx={{ flex: '0 0 calc(50% - 8px)' }}>
            <Typography variant="body2" color="textSecondary">Humidity</Typography>
            <Typography variant="body1">{weatherData.humidity !== undefined ? `${weatherData.humidity}%` : 'N/A'}</Typography>
          </Box>
          <Box sx={{ flex: '0 0 calc(50% - 8px)' }}>
            <Typography variant="body2" color="textSecondary">Rainfall</Typography>
            <Typography variant="body1">{weatherData.rainfall !== undefined ? `${weatherData.rainfall}mm` : 'N/A'}</Typography>
          </Box>
          <Box sx={{ flex: '0 0 calc(50% - 8px)' }}>
            <Typography variant="body2" color="textSecondary">Wind Speed</Typography>
            <Typography variant="body1">{weatherData.windSpeed !== undefined ? `${weatherData.windSpeed}m/s` : 'N/A'}</Typography>
          </Box> */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherDataDisplay;












// import React from 'react';
// import { Box, Card, CardContent, Typography } from '@mui/material';
// import { WeatherData, WeatherStation } from '../../types';

// interface WeatherDataDisplayProps {
//   station: WeatherStation;
//   weatherData: WeatherData | null;
//   loading: boolean;
//   error: string | null;
// }

// const WeatherDataDisplay: React.FC<WeatherDataDisplayProps> = ({ station, weatherData, loading, error }) => {
//   if (loading) {
//     return (
//       <Card>
//         <CardContent>
//           <Typography>Loading...</Typography>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card>
//         <CardContent>
//           <Typography color="error">{error}</Typography>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (!weatherData) {
//     return (
//       <Card>
//         <CardContent>
//           <Typography>No weather data available</Typography>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h6" gutterBottom>
//           {station.name}
//         </Typography>
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//           <Box sx={{ flex: '0 0 calc(50% - 8px)' }}>
//             <Typography variant="body2" color="textSecondary">
//               Temperature
//             </Typography>
//             <Typography variant="body1">
//               {weatherData.temperature !== undefined ? `${weatherData.temperature}°C` : 'N/A'}
//             </Typography>
//           </Box>
//           <Box sx={{ flex: '0 0 calc(50% - 8px)' }}>
//             <Typography variant="body2" color="textSecondary">
//               Humidity
//             </Typography>
//             <Typography variant="body1">
//               {weatherData.humidity !== undefined ? `${weatherData.humidity}%` : 'N/A'}
//             </Typography>
//           </Box>
//           <Box sx={{ flex: '0 0 calc(50% - 8px)' }}>
//             <Typography variant="body2" color="textSecondary">
//               Rainfall
//             </Typography>
//             <Typography variant="body1">
//               {weatherData.rainfall !== undefined ? `${weatherData.rainfall}mm` : 'N/A'}
//             </Typography>
//           </Box>
//           <Box sx={{ flex: '0 0 calc(50% - 8px)' }}>
//             <Typography variant="body2" color="textSecondary">
//               Wind Speed
//             </Typography>
//             <Typography variant="body1">
//               {weatherData.windSpeed !== undefined ? `${weatherData.windSpeed}m/s` : 'N/A'}
//             </Typography>
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default WeatherDataDisplay;
