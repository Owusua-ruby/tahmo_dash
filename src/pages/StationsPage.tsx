import React, { useState } from 'react';
import { WeatherStation } from '../types';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  Button,
  Card,
  InputAdornment,
  Chip,

} from '@mui/material';
import { 
  Search, 
  LocationOn, 
  Visibility, 
} from '@mui/icons-material';

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
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography>Loading stations...</Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Weather Stations Dashboard
      </Typography>
      
      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search stations by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 600 }}
        />
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Stations Table */}
      <Card>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Station Name</TableCell>
                <TableCell>Station ID</TableCell>
                <TableCell align="center">Location</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStations.map((station) => (
                <TableRow 
                  key={station.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    <Typography variant="body1" fontWeight="medium">
                      {station.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {station.id}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2">
                        {station.latitude?.toFixed(4)}, {station.longitude?.toFixed(4)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={station.lastUpdate ? "Active" : "Offline"} 
                      color={station.lastUpdate ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Visibility />}
                      onClick={() => onStationSelect(station.id)}
                    >
                      View Data
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredStations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
};

export default StationsPage;
