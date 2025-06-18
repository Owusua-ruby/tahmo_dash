import React, { useState } from 'react';
import { WeatherStation } from '../types';
import * as FaIcons from 'react-icons/fa';

interface StationsPageProps {
  stations: WeatherStation[];
  loading: boolean;
  error: string | null;
  onStationSelect: (stationId: string) => void;
}

const StationsPage: React.FC<StationsPageProps> = ({
  stations,
  loading,
  error,
  onStationSelect,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter stations based on search term
  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current page stations
  const paginatedStations = filteredStations.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handle pagination change
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-2xl animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-6" />
          <div className="h-96 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full py-8 text-center border-b border-gray-200 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Weather Stations Dashboard</h1>
        <p className="text-gray-500 text-base">Monitor real-time weather data from {stations.length} stations across the network</p>
      </header>

      {/* Stats */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <FaIcons.FaCheckCircle className="text-green-500 text-2xl mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stations.filter(s => s.lastUpdate).length}</div>
          <div className="text-xs text-gray-500 mt-1">Active Stations</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <FaIcons.FaTimesCircle className="text-gray-400 text-2xl mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stations.filter(s => !s.lastUpdate).length}</div>
          <div className="text-xs text-gray-500 mt-1">Offline Stations</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <FaIcons.FaDatabase className="text-blue-500 text-2xl mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stations.length}</div>
          <div className="text-xs text-gray-500 mt-1">Total Stations</div>
        </div>
      </div>

      {/* Search */}
      <div className="w-full max-w-5xl mx-auto mb-6">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 bg-white"
          placeholder="Search stations by name or ID..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="w-full max-w-5xl mx-auto mb-4">
          <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg px-4 py-3 text-center">
            {error}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="w-full max-w-5xl mx-auto flex-1 overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left font-semibold">Station Name</th>
              <th className="py-3 px-4 text-left font-semibold">Station ID</th>
              <th className="py-3 px-4 text-center font-semibold">Location</th>
              <th className="py-3 px-4 text-center font-semibold">Status</th>
              <th className="py-3 px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStations.map((station) => (
              <tr
                key={station.id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="py-3 px-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                    <FaIcons.FaMapMarkerAlt className="text-gray-400 mr-1" />
                    {station.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-medium text-gray-900">{station.name}</span>
                </td>
                <td className="py-3 px-4 font-mono text-gray-500">{station.id}</td>
                <td className="py-3 px-4 text-center font-mono text-gray-500">
                  {station.latitude?.toFixed(4)}, {station.longitude?.toFixed(4)}
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${station.lastUpdate ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                    {station.lastUpdate ? 'Active' : 'Offline'}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-1 font-semibold text-xs transition-colors"
                    onClick={() => onStationSelect(station.id)}
                  >
                    View Data
                  </button>
                </td>
              </tr>
            ))}
            {paginatedStations.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400">No stations found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-4">
          <div className="text-gray-500 text-xs">
            Showing {page * rowsPerPage + 1} - {Math.min((page + 1) * rowsPerPage, filteredStations.length)} of {filteredStations.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 disabled:opacity-50"
              onClick={() => handleChangePage(null, Math.max(page - 1, 0))}
              disabled={page === 0}
            >
              Previous
            </button>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-gray-700 bg-white"
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
            >
              {[5, 10, 25, 50].map(opt => (
                <option key={opt} value={opt}>{opt} / page</option>
              ))}
            </select>
            <button
              className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 disabled:opacity-50"
              onClick={() => handleChangePage(null, Math.min(page + 1, Math.ceil(filteredStations.length / rowsPerPage) - 1))}
              disabled={page >= Math.ceil(filteredStations.length / rowsPerPage) - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationsPage;
