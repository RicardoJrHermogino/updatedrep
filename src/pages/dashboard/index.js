import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, CssBaseline, Button, CircularProgress, IconButton, Badge } from "@mui/material";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import Navbar from "../components/navbar";
import { useRouter } from 'next/router';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import greeting from 'greeting-time';
import axios from 'axios';
import WeatherDisplay from './dashboardcomp/weatherdisplay';
import RecommendedTask from './dashboardcomp/recommendedtask';
import WeatherData from './dashboardcomp/weatherdata';
import LocationSelect from './dashboardcomp/LocationSelect';
import DatePicker from './dashboardcomp/DatePicker';
import CustomTimePicker from './dashboardcomp/TimePicker'; // Import the new TimePicker component
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RecommendedTaskPage from './dashboardcomp/RecommendedTaskPage';

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

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 380,
      width: 310,
      borderRadius: 12,
      padding: '20px',
    },
  },
};

const Dashboard = () => {
  const [greetingMessage, setGreetingMessage] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState("");
  const [location, setLocation] = useState("Sorsogon City");
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD")); // Date only
  const [selectedTime, setSelectedTime] = useState(dayjs().format("HH:mm")); // Time only
  const [forecast, setForecast] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const apiKey = "588741f0d03717db251890c0ec9fd071";

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const { lat, lon } = locationCoordinates[location];
      
      // Check if the selected date is today
      const isToday = selectedDate === dayjs().format("YYYY-MM-DD");
      const currentTime = dayjs().format("HH:mm"); // Get current time
  
      // If the selected time is within 1 hour of the current time, use Current Weather API
      const timeDiff = dayjs(`${selectedDate} ${selectedTime}`).diff(dayjs(), 'minute');
  
      if (isToday && timeDiff <= 60 && timeDiff >= 0) {
        // If the selected time is within the next hour or exactly now, fetch current weather
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        const currentWeather = response.data;
  
        setTemperature(Math.round(currentWeather.main.temp));
        setWeatherCondition(currentWeather.weather[0].description);
      } 
      else if (isToday && selectedTime > currentTime) {
        // Fetch 5-day forecast for today if the time is in the future
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
  
        const filteredData = response.data.list.filter((item) =>
          item.dt_txt.startsWith(selectedDate) // Filter by selected date
        );
  
        setForecast(filteredData); // Set the filtered forecast data
  
        // Determine the most relevant weather data based on the selected time
        const selectedDateTime = dayjs(`${selectedDate} ${selectedTime}`).format("YYYY-MM-DD HH:mm");
        const closestWeather = filteredData.reduce((prev, curr) => {
          const currDateTime = dayjs(curr.dt_txt);
          const selectedDateTimeObj = dayjs(selectedDateTime);
  
          return Math.abs(currDateTime.diff(selectedDateTimeObj)) < Math.abs(dayjs(prev.dt_txt).diff(selectedDateTimeObj)) ? curr : prev;
        }, filteredData[0]);
  
        if (closestWeather) {
          setTemperature(Math.round(closestWeather.main.temp));
          setWeatherCondition(closestWeather.weather[0].description);
        }
      } 
      else {
        // If the selected date is in the future or the time is past, fetch the forecast
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
  
        const filteredData = response.data.list.filter((item) =>
          item.dt_txt.startsWith(selectedDate) // Filter by selected date
        );
  
        setForecast(filteredData); // Set the filtered forecast data
  
        // Determine the most relevant weather data based on the selected time
        const selectedDateTime = dayjs(`${selectedDate} ${selectedTime}`).format("YYYY-MM-DD HH:mm");
        const closestWeather = filteredData.reduce((prev, curr) => {
          const currDateTime = dayjs(curr.dt_txt);
          const selectedDateTimeObj = dayjs(selectedDateTime);
  
          return Math.abs(currDateTime.diff(selectedDateTimeObj)) < Math.abs(dayjs(prev.dt_txt).diff(selectedDateTimeObj)) ? curr : prev;
        }, filteredData[0]);
  
        if (closestWeather) {
          setTemperature(Math.round(closestWeather.main.temp));
          setWeatherCondition(closestWeather.weather[0].description);
        }
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  useEffect(() => {
    fetchWeatherData();
  
    const currentGreeting = greeting(new Date());
    setGreetingMessage(currentGreeting);
  }, [location, selectedDate, selectedTime]); // Add selectedTime as a dependency
  

  const TaskButton = () => {
    router.push('/dashboard/task');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CssBaseline />
      <Navbar />
      <Grid container mb={15} spacing={4} style={{ padding: "20px" }}>
        <Grid item xs={6}>
          <Typography variant="h6"><strong>TaskWeatherSync</strong></Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconButton>
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="#757575">
            {greetingMessage}, {/* Display the dynamic greeting here */}
          </Typography>
          <Typography variant="body"><strong>Ricardo Jr. E. Hermogino</strong></Typography>
        </Grid>

        <LocationSelect 
          location={location}
          setLocation={setLocation}
          locationCoordinates={locationCoordinates}
          MenuProps={MenuProps}
        /> 
        <DatePicker 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <CustomTimePicker // Add the new TimePicker component
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
        

        <WeatherDisplay
          forecast={forecast}
          currentDate={dayjs(`${selectedDate} ${selectedTime}`).format('dddd, MMMM D, YYYY HH:mm')}
          weatherCondition={weatherCondition}
          temperature={temperature}
        />

        <RecommendedTask 
          location={location}           
          forecast={forecast}
          currentDate={dayjs(`${selectedDate} ${selectedTime}`).format('dddd, MMMM D, YYYY HH:mm')}
          weatherCondition={weatherCondition}
          temperature={temperature}
          // Pass selectedTime to RecommendedTask
        />

        <WeatherData 
          forecast={forecast} 
          selectedDate={selectedDate}
        />
        
        {/* <RecommendedTaskPage/> */}


      </Grid>
    </LocalizationProvider>
  );
};

export default Dashboard;
