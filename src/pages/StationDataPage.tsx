import React from 'react';
import { WeatherStation, WeatherData } from '../types';
import * as FaIcons from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import StationLocationMap from '../components/StationLocationMap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <button
          className="mb-4 px-4 py-2 rounded border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-semibold"
          onClick={onBackToStations}
        >
          ← Back to Stations
        </button>
        <div className="text-lg text-gray-500">No station selected</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-2xl animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-6" />
          <div className="h-96 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <button
          className="mb-4 px-4 py-2 rounded border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-semibold"
          onClick={onBackToStations}
        >
          ← Back to Stations
        </button>
        <div className="text-lg text-red-500 font-semibold">{error}</div>
      </div>
    );
  }

  // Weather summary items
  const infoItems = [
    {
      label: 'Temperature',
      value: weatherData?.temperature !== undefined ? `${weatherData.temperature}°C` : 'N/A',
      icon: <FaIcons.FaThermometerHalf className="text-red-500" />,
    },
    {
      label: 'Humidity',
      value: weatherData?.humidity !== undefined ? `${weatherData.humidity}%` : 'N/A',
      icon: '💧',
    },
    {
      label: 'Rainfall',
      value: weatherData?.rainfall !== undefined ? `${weatherData.rainfall} mm` : 'N/A',
      icon: '🌧️',
    },
    {
      label: 'Wind Speed',
      value: weatherData?.windSpeed !== undefined ? `${weatherData.windSpeed} m/s` : 'N/A',
      icon: '💨',
    },
    {
      label: 'Air Pressure',
      value: weatherData?.airPressure !== undefined ? `${weatherData.airPressure} hPa` : 'N/A',
      icon: '🧭',
    },
    {
      label: 'Solar Radiation',
      value: weatherData?.solarRadiation !== undefined ? `${weatherData.solarRadiation} W/m²` : 'N/A',
      icon: '☀️',
    },
    {
      label: 'Wind Gust',
      value: weatherData?.windGust !== undefined ? `${weatherData.windGust} m/s` : 'N/A',
      icon: '🌬️',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <div className="w-full max-w-5xl mx-auto py-8">
        <button
          className="mb-6 px-4 py-2 rounded border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-semibold"
          onClick={onBackToStations}
        >
          ← Back to Stations
        </button>
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 bg-white rounded-lg shadow-md p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <FaIcons.FaMapMarkerAlt className="text-blue-500" />
              <span className="font-bold text-lg text-gray-900">{station.name}</span>
              <span className="ml-2 text-xs text-gray-400">({station.id})</span>
            </div>
            <div className="text-gray-500 text-sm mb-1">
              {station.latitude?.toFixed(4)}, {station.longitude?.toFixed(4)}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FaIcons.FaClock />
              <span>Last Update: {weatherData?.timestamp ? new Date(weatherData.timestamp).toLocaleString() : 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FaIcons.FaSignal className={weatherData?.status === 1 ? 'text-green-500' : 'text-gray-400'} />
              <span>Status: {weatherData?.status === 1 ? 'Online' : 'Offline'}</span>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-md p-6 flex flex-col gap-2">
            <div className="font-bold text-gray-900 mb-2">Weather Details</div>
            <div className="grid grid-cols-2 gap-3">
              {infoItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-700">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-xs text-gray-500">{item.label}:</span>
                  <span className="font-semibold text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Station Location Map */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <FaIcons.FaMapMarkerAlt className="mr-2 text-blue-500" />
            Station Location
          </h2>
          <div className="h-96 rounded-lg overflow-hidden border">
            <StationLocationMap station={station} />
          </div>
        </div>

        {/* 7-Day Rainfall Forecast Chart */}
        {weatherData?.forecasts && weatherData.forecasts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              <FaIcons.FaDatabase className="mr-2 text-blue-500" />
              7-Day Rainfall Forecast
            </h2>
            <Line
              data={{
                labels: weatherData.forecasts.map(([date]: [string, number]) => new Date(date).toLocaleDateString()),
                datasets: [
                  {
                    label: 'Rainfall (mm)',
                    data: weatherData.forecasts.map(([, rainfall]: [string, number]) => rainfall),
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: '#3b82f6',
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                  tooltip: { mode: 'index' as const, intersect: false },
                },
                scales: {
                  x: { grid: { display: false } },
                  y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
                },
              }}
              className="w-full h-72"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StationDataPage;
