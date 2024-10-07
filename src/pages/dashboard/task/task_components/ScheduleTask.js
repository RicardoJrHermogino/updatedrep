import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Grid, Box, IconButton, CssBaseline, Button,
  MenuItem, TextField, FormControl, InputLabel, Select, OutlinedInput
} from '@mui/material';
import { ArrowBack, Edit as EditIcon } from '@mui/icons-material';
import Navbar from '../../../components/navbar';
import { useRouter } from 'next/router';
import getOrCreateUUID from '@/utils/uuid'; // Import the UUID utility

const ScheduleTask = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCoordinates, setSelectedCoordinates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null); // State to store user ID

  // Location coordinates data
  const locationCoordinates = {
    "Sorsogon City": { lat: 12.9742, lon: 124.0058 },
    "Barcelona": { lat: 12.8694, lon: 124.1419 },
    "Bulan": { lat: 12.6697, lon: 123.8758 },
    "Bulusan": { lat: 12.7522, lon: 124.1356 },
    "Casiguran": { lat: 13.2933, lon: 123.8744 },
    "Castilla": { lat: 12.9553, lon: 123.8764 },
    "Donsol": { lat: 12.9083, lon: 123.5980 },
    "Gubat": { lat: 12.9189, lon: 124.1231 },
    "Irosin": { lat: 12.7050, lon: 124.0320 },
    "Juban": { lat: 12.8477, lon: 123.9894 },
    "Magallanes": { lat: 12.8284, lon: 123.8344 },
    "Matnog": { lat: 12.5855, lon: 124.0855 },
    "Pilar": { lat: 12.9245, lon: 123.6756 },
    "Prieto Diaz": { lat: 13.0458, lon: 124.1929 },
    "Santa Magdalena": { lat: 12.6489, lon: 124.1083 }
  };

  // Function to go back to the previous page
  const handleGoBack = () => router.back();
  const handleGoToAddTask = () => router.push('/dashboard/task/task_components/addtask');

  // Fetch the tasks and set the user ID (UUID)
  useEffect(() => {
    const uuid = getOrCreateUUID(); // Get or create the user ID
    setUserId(uuid); // Set the user ID in the state

    const fetchTasks = async () => {
      try {
        const response = await fetch('https://ricardojrhermogino.github.io/json_server_host_api/tasksdb.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        if (data && Array.isArray(data.tasks)) setTasks(data.tasks);
        else throw new Error("Invalid data structure: expected an array of tasks.");
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Handle task selection
  const handleTaskChange = (event) => setSelectedTask(event.target.value);

  // Handle location selection and set coordinates
  const handleLocationChange = (event) => {
    const selectedLoc = event.target.value;
    setSelectedLocation(selectedLoc);
    const locationData = locationCoordinates[selectedLoc];
    if (locationData) setSelectedCoordinates({ lat: locationData.lat, lon: locationData.lon });
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const gradientStyle = { padding: "20px", borderRadius: "5px" };
  const MenuProps = { PaperProps: { style: { maxHeight: 400, width: 250 } } };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!userId) {
      alert("User ID is not available");
      return;
    }

    // Prepare the data to be sent
    const taskData = {
      userId, // Include the user ID from UUID
      taskID: new Date().getTime(), // Generate a unique task ID
      task: selectedTask,
      date: selectedDate,
      time: selectedTime,
      location: selectedLocation,
      lat: selectedCoordinates.lat,
      lon: selectedCoordinates.lon,
      weatherRestrictions: [
        { main: "Clear", description: "Clear sky" },
        { main: "Clouds", description: "Few clouds" }
      ],
      details: "Task details here", // Add your task details
      requiredTemperature: {
        min: 20, // Replace with actual data
        max: 35  // Replace with actual data
      },
      idealHumidity: {
        min: 60, // Replace with actual data
        max: 85  // Replace with actual data
      }
    };

    try {
      const response = await fetch('http://localhost:3000/api/tasks', { // Adjust the endpoint if needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Task scheduled successfully:', result);

      // Alert the user that the task was added
      alert('Task scheduled successfully!');

      // Redirect to /dashboard/task after successful submission
      router.push('/dashboard/task');
    } catch (error) {
      console.error("Error scheduling task:", error);
      setError(error.message); // Set error state to display the error
    }
  };

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ mt: 8 }}>
          <IconButton onClick={handleGoBack} sx={{ position: 'absolute', top: 15, left: 20 }}>
            <ArrowBack />
          </IconButton>
          <Box sx={{ position: 'fixed', bottom: 90, right: 25, zIndex: 9999 }}>
            <Button 
              variant="contained"  
              onClick={handleGoToAddTask} 
              sx={{
                px: '20px', borderRadius: '15px', mb: 3, bgcolor: 'white',
                color: "black", boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              <EditIcon sx={{ fontSize: 20, marginRight: '5px' }} /> Customize
            </Button>
          </Box>

          {/* Display User ID */}
          {userId && (
            <Box sx={{ my: 4 }}>
              <Typography variant="body2" color="textSecondary">
                <strong>User ID:</strong> {userId} {/* Display the User ID */}
              </Typography>
            </Box>
          )}

          {loading ? (
            <Typography variant="h6" align="center" color="primary">Loading tasks...</Typography>
          ) : error ? (
            <Typography variant="h6" align="center" color="error">{error}</Typography>
          ) : (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4} style={gradientStyle} justifyContent="center" mb={10}>
                <Grid item xs={12}>
                  <Typography variant="h6" align="left"><strong>Schedule task</strong></Typography>
                </Grid>

                {/* Task Dropdown */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="task-select-label">Select Task</InputLabel>
                    <Select
                      labelId="task-select-label"
                      value={selectedTask}
                      onChange={handleTaskChange}
                      input={<OutlinedInput label="Select Task" />}
                      sx={{
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-root': { borderRadius: '10px' },
                        '& fieldset': { borderRadius: '10px' },
                        backgroundColor: '#f5f7fa',
                      }}
                      required
                    >
                      {tasks.length > 0 ? (
                        tasks.map(task => (
                          <MenuItem key={task.id} value={task.task}>
                            {task.task}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled>No tasks available</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Location Dropdown */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="location-select-label">Select Location</InputLabel>
                    <Select labelId="location-select-label" value={selectedLocation} MenuProps={MenuProps} onChange={handleLocationChange} input={<OutlinedInput label="Select Location" />}
                      sx={{borderRadius: '10px', '& .MuiOutlinedInput-root': { borderRadius: '10px' },'& fieldset': { borderRadius: '10px' }, backgroundColor: '#f5f7fa',}} required
                    >
                      {Object.keys(locationCoordinates).map(loc => (
                        <MenuItem key={loc} value={loc}>
                          {loc}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Date Input */}
                <Grid item xs={6}>
                  <TextField label="Select Date" type="date" value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)} fullWidth 
                    InputProps={{ inputProps: { min: getCurrentDate() } }} 
                    InputLabelProps={{ shrink: true }} required 
                  />
                </Grid>

                {/* Time Input */}
                <Grid item xs={6}>
                  <TextField label="Select Time" type="time" value={selectedTime} 
                    onChange={(e) => setSelectedTime(e.target.value)} fullWidth 
                    InputLabelProps={{ shrink: true }} required 
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" sx={{ width: '100%', borderRadius: '10px', backgroundColor: '#4caf50' }}>Add</Button>
                </Grid>

              </Grid>
            </form>
          )}
        </Box>
      </Container>
    </>
  );
};

export default ScheduleTask;
