import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material';
import L from 'leaflet';
import { WeatherStation } from '../../types';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface MapProps {
  stations: WeatherStation[];
  selectedStation: WeatherStation | null;
  onSelectStation: (station: WeatherStation | null) => void;
}

const WeatherMap: React.FC<MapProps> = ({ stations, selectedStation, onSelectStation }) => {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={[0, 0]}
        zoom={3}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.latitude, station.longitude]}
            eventHandlers={{
              click: () => onSelectStation(station),
            }}
          >
            <Popup>{station.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default WeatherMap;
