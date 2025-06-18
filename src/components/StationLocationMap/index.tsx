import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { WeatherStation } from '../../types';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface StationLocationMapProps {
  station: WeatherStation;
}

const StationLocationMap: React.FC<StationLocationMapProps> = ({ station }) => {
  const center: [number, number] = [station.latitude, station.longitude];
  
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center}>
          <Popup>
            <div className="text-center">
              <div className="font-bold text-gray-900">{station.name}</div>
              <div className="text-sm text-gray-600">ID: {station.id}</div>
              <div className="text-xs text-gray-500">
                {station.latitude.toFixed(4)}, {station.longitude.toFixed(4)}
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default StationLocationMap;
