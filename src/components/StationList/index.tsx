// src/components/StationList.tsx

import React from 'react';
import { List, ListItemButton, ListItemText, Paper, Typography, Box } from '@mui/material';
import { WeatherStation } from '../../types';

interface Props {
  stations: WeatherStation[];
  selectedStationId: string | undefined;
  onStationSelect: (id: string) => void;
}

const StationList: React.FC<Props> = ({ stations, selectedStationId, onStationSelect }) => {
  console.log('Stations:', stations);
  return (
    <Paper sx={{ width: 250, maxHeight: 500, overflowY: 'auto' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">Weather Stations</Typography>
        <Typography variant="caption" color="textSecondary">
          {stations.length} stations available
        </Typography>
      </Box>
      <List>
        {stations.map((station) => (
          <ListItemButton
            key={station.id}
            selected={station.id === selectedStationId}
            onClick={() => onStationSelect(station.id)}
          >
            <ListItemText 
              primary={station.name} 
              secondary={station.id}
              primaryTypographyProps={{ fontSize: '0.9rem' }}
              secondaryTypographyProps={{ fontSize: '0.75rem' }}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};

export default StationList;

























// import React from 'react';
// import { List, ListItemButton, ListItemText, Paper } from '@mui/material';
// import { WeatherStation } from '../../types';

// interface Props {
//   stations: WeatherStation[];
//   selectedStationId: string | undefined;
//   onStationSelect: (id: string) => void;
// }

// const StationList: React.FC<Props> = ({ stations, selectedStationId, onStationSelect }) => {
//   return (
//     <Paper sx={{ width: 250, overflowY: 'auto' }}>
//       <List>
//         {stations.map(station => (
//           <ListItemButton
//             key={station.id}
//             selected={station.id === selectedStationId}
//             onClick={() => onStationSelect(station.id)}
//           >
//             <ListItemText primary={station.name} />
//           </ListItemButton>
//         ))}
//       </List>
//     </Paper>
//   );
// };

// export default StationList;

// import React, { useState } from 'react';
// import {
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Paper,
//   Typography,
//   TextField,
//   Box,
// } from '@mui/material';
// import { WeatherStation } from '../../types';

// interface StationListProps {
//   stations: WeatherStation[];
//   selectedStationId?: string;
//   onStationSelect: (stationId: string) => void;
// }

// const StationList: React.FC<StationListProps> = ({
//   stations,
//   selectedStationId,
//   onStationSelect,
// }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   // Filter stations by name
//   const filteredStations = stations.filter(station =>
//     station.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Paper sx={{ height: '100%', overflow: 'auto' }}>
//       <Box sx={{ p: 2 }}>
//         <Typography variant="h6">Weather Stations</Typography>
//         <TextField
//           fullWidth
//           label="Search stations"
//           variant="outlined"
//           size="small"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ mt: 1 }}
//         />
//       </Box>

//       <List>
//         {filteredStations.map((station) => (
//           <ListItem key={station.id} disablePadding>
//             <ListItemButton
//               selected={station.id === selectedStationId}
//               onClick={() => onStationSelect(station.id)}
//             >
//               <ListItemText
//                 primary={station.name}
//                 secondary={`Last update: ${station.lastUpdate || 'N/A'}`}
//               />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Paper>
//   );
// };

// export default StationList;
