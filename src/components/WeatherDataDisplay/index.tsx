// src/components/WeatherDataDisplay.tsx

import React from 'react';
import { WeatherStation, WeatherData } from '../../types';

interface WeatherDataDisplayProps {
  station: WeatherStation | undefined;
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const WeatherDataDisplay: React.FC<WeatherDataDisplayProps> = ({ 
  station, 
  weatherData, 
  loading, 
  error 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-gray-200 mb-2 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-3/5 mx-auto mb-2" />
            <div className="h-8 bg-gray-200 rounded w-4/5 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold py-8">{error}</div>
    );
  }

  if (!station || !weatherData) {
    return (
      <div className="text-center text-gray-500 font-semibold py-8">No data available.</div>
    );
  }

  const weatherItems = [
    {
      label: 'Temperature',
      value: weatherData.temperature !== undefined ? `${weatherData.temperature}°C` : 'N/A',
      icon: '🌡️',
      color: 'text-red-500',
      bgColor: 'bg-red-100',
    },
    {
      label: 'Humidity',
      value: weatherData.humidity !== undefined ? `${weatherData.humidity}%` : 'N/A',
      icon: '💧',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Wind Speed',
      value: weatherData.windSpeed !== undefined ? `${weatherData.windSpeed} m/s` : 'N/A',
      icon: '💨',
      color: 'text-green-500',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Rainfall',
      value: weatherData.rainfall !== undefined ? `${weatherData.rainfall} mm` : 'N/A',
      icon: '🌧️',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-100',
    },
  ];

  return (
    <div>
      <div className="mb-6 text-center">
        <span className="text-gray-500">Last Update: </span>
        <span className="font-semibold">
          {weatherData.timestamp ? new Date(weatherData.timestamp).toLocaleString() : 'N/A'}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {weatherItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition-transform transform hover:-translate-y-1 border p-6 flex flex-col items-center">
            <div className={`w-14 h-14 flex items-center justify-center rounded-full mb-3 text-2xl ${item.bgColor}`}>
              <span className={item.color}>{item.icon}</span>
            </div>
            <div className="text-gray-500 text-sm mb-1">{item.label}</div>
            <div className={`text-xl font-bold ${item.color}`}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDataDisplay;