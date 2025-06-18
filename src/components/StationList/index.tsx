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

