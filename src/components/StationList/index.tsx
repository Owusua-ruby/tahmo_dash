// src/components/StationList.tsx

import React from 'react';
import { List, ListItemButton, ListItemText, Paper } from '@mui/material';
import { WeatherStation } from '../../types';

interface Props {
  stations: WeatherStation[];
  // stations: any;
  selectedStationId: string | undefined;
  onStationSelect: (id: string) => void;
}

const StationList: React.FC<Props> = ({ stations, selectedStationId, onStationSelect }) => {
  console.log('menu', stations[0])
  return (
    <Paper sx={{ width: 250, maxHeight: 500, overflowY: 'auto' }}>
      <List>
        {/* {
          stations.map((station,i)=><div key={i} selected={station.id === selectedStationId}
          onClick={() => onStationSelect(station.id)}>
            
            {station[1]}
          </div>)
        } */}
        {stations.map((station:any) => (
          <ListItemButton
           key ={station.id}
            selected={station.id === selectedStationId}
            onClick={() => onStationSelect(station.id)}
          >
            <ListItemText primary={station[1]} />
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
