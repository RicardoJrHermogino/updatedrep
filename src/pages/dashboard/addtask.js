import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, FormControl, Select, MenuItem, Button, IconButton, Grid, CssBaseline, Checkbox, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';
import axios from 'axios'; // Import axios for API calls

const style = {
  width: '85%',
  maxWidth: 400,
  borderRadius: 6,
  padding: '24px',
  backgroundColor: '#fff',
  margin: 'auto',
  marginTop: '40px',
  boxShadow: 'none',
};

const weatherOptions = [
  'Rain',
  'Strong Winds',
  'Extreme Heat',
  'Storms'
];

const municipalities = [
  'Sorsogon City',
  'Barcelona',
  'Bulan',
  'Bulusan',
  'Casiguran',
  'Castilla',
  'Donsol',
  'Gubat',
  'Irosin',
  'Juban',
  'Magallanes',
  'Matnog',
  'Pilar',
  'Prieto Diaz',
  'Santa Magdalena',
];

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      width: 250,
      borderRadius: 12,
      padding: '10px',
    },
  },
};

export default function AddTask() {
  const [taskName, setTaskName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [selectedWeather, setSelectedWeather] = useState([]);
  const [userId, setUserId] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeatherData(location);
    }
  }, [location]);

  const fetchWeatherData = async (selectedLocation) => {
    setLoading(true);
    try {
      const apiKey = '588741f0d03717db251890c0ec9fd071';
      const coordinates = getCoordinatesForMunicipality(selectedLocation);
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCoordinatesForMunicipality = (municipality) => {
    const coordinates = {
      "Sorsogon City": { lat: 13.1667, lon: 123.0833 },
      "Barcelona": { lat: 13.2794, lon: 123.8222 },
      "Bulan": { lat: 12.9914, lon: 124.0483 },
      "Bulusan": { lat: 12.7514, lon: 124.0656 },
      "Casiguran": { lat: 13.2933, lon: 123.8744 },
      "Castilla": { lat: 13.1972, lon: 123.7581 },
      "Donsol": { lat: 12.9597, lon: 124.0736 },
      "Gubat": { lat: 13.0667, lon: 123.6167 },
      "Irosin": { lat: 12.9883, lon: 124.0606 },
      "Juban": { lat: 12.8933, lon: 124.0864 },
      "Magallanes": { lat: 13.1483, lon: 123.8208 },
      "Matnog": { lat: 12.8333, lon: 124.0833 },
      "Pilar": { lat: 13.0856, lon: 123.8875 },
      "Prieto Diaz": { lat: 12.9342, lon: 124.0711 },
      "Santa Magdalena": { lat: 12.9333, lon: 124.0500 }
    };
    return coordinates[municipality] || { lat: 0, lon: 0 };
  };

  const checkFeasibility = () => {
    if (weatherData) {
      const currentWeather = weatherData.weather[0].main; 
      const isFeasible = !selectedWeather.includes(currentWeather);
      if (!isFeasible) {
        setModalMessage('The task is not feasible due to the current weather conditions.');
        setModalOpen(true);
      }
      return isFeasible;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId) {
      const feasible = checkFeasibility();
      if (feasible) {
        try {
          const response = await fetch('http://localhost:3001/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              taskName,
              location,
              date,
              restrictedWeather: selectedWeather,
              weatherData,
            }),
          });
  
          if (!response.ok) {
            throw new Error('Failed to add task');
          }
  
          router.push('/dashboard/task/');
        } catch (error) {
          console.error('Error adding the task:', error);
        }
      } else {
        setModalMessage('The task is not feasible due to the current weather conditions.');
        setModalOpen(true);
      }
    } else {
      console.error('User not logged in');
    }
  };
  

  const handleGoBack = () => {
    router.back();
  };

  const handleWeatherChange = (event) => {
    const { target: { value } } = event;
    setSelectedWeather(typeof value === 'string' ? value.split(',') : value);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Container maxWidth="sm" spacing={6}>
        <Grid container mb={10} >
          <Box sx={style}>
            <IconButton onClick={handleGoBack} sx={{ position: 'absolute', top: 15, left: 20 }}>
              <ArrowBack />
            </IconButton>
            <Typography mb={3} variant="h5"><strong>Add New Task</strong></Typography>
            {loading ? (
              <Typography variant="body2" color="textSecondary">Fetching weather data...</Typography>
            ) : weatherData ? (
              <Typography variant="body2" color="textSecondary">Current weather: {weatherData.weather[0].description}</Typography>
            ) : null}
            <form onSubmit={handleSubmit}>
              <TextField
                margin="dense"
                id="task"
                label="Task Name"
                type="text"
                fullWidth
                variant="outlined"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
                sx={{ borderRadius: 2 }}
              />
              <FormControl fullWidth margin="dense">
                <Select
                  labelId="location-label"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  MenuProps={MenuProps}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">
                    <em>Select Location</em>
                  </MenuItem>
                  {municipalities.map((municipality) => (
                    <MenuItem key={municipality} value={municipality}>
                      {municipality}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <Select
                  labelId="restricted-weather-label"
                  id="restricted-weather"
                  multiple
                  value={selectedWeather}
                  onChange={handleWeatherChange}
                  renderValue={(selected) => selected.join(', ')}
                  variant="outlined"
                  MenuProps={MenuProps}
                  sx={{ borderRadius: 2 }}
                >
                  {weatherOptions.map((weather) => (
                    <MenuItem key={weather} value={weather}>
                      <Checkbox checked={selectedWeather.indexOf(weather) > -1} />
                      <ListItemText primary={weather} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                margin="dense"
                id="date"
                label="Date"
                type="date"
                fullWidth
                variant="outlined"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ borderRadius: 2 }}
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#00796B',
                  borderRadius: 2,
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Grid>
      </Container>

      {/* Modal for feasibility alert */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Task Feasibility</DialogTitle>
        <DialogContent>
          <Typography>{modalMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
