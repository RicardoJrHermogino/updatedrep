import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, CssBaseline, Paper, IconButton, Badge } from '@mui/material';
import Navbar from "../components/navbar";
import Image from 'next/image'; 
import dayjs from "dayjs";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/router';


const API_KEY = '5726f728f2cd3a818fdd39c3348c4399';
const CITY = 'Sorsogon';

const mapWeatherDescription = (description) => {
  const weatherMap = {
    "clear sky": "Clear Sky",
    "few clouds": "Partly Cloudy",
    "scattered clouds": "Partly Cloudy",
    "broken clouds": "Partly Cloudy",
    "shower rain": "Rain Showers",
    "rain": "Rainy",
    "thunderstorm": "Thunderstorms",
    "snow": "Snowy",
    "mist": "Misty"
  };

  return weatherMap[description.toLowerCase()] || description;
};

export default function Forecasts() {
  const router = useRouter();

  const [weatherToday, setWeatherToday] = useState(null);
  const currentDate = dayjs().format("MMMM DD, YYYY");
  const tomorrowDate = dayjs().add(1, 'day').format("MMMM DD, YYYY");
  const currentDay = dayjs().format("dddd");

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setWeatherToday(data));
  }, []);

  const gradientStyle = {
    padding: "20px",
    borderRadius: "5px"
  };

  return (
    <>
      <Navbar />
      <CssBaseline />
        <Grid container mb={10} spacing={3} style={gradientStyle} >
          <Grid item xs={6}>
            <Typography variant="h4"><strong>Forecast</strong></Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <IconButton onClick={() => router.push('/dashboard/notifications')}>
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton onClick={() => router.push('/dashboard/profile')}>
              <SettingsIcon />
              </IconButton>
            </div>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: "center" }} mt={8}>
            <Image src="/3d-weather-icons/sun/27.png" alt="sample" width={160} height={140} />
          </Grid>

          {weatherToday && (
          <>
            <Grid item xs={6} sx={{ textAlign: "center" }} mt={8}>
              <Typography sx={{ letterSpacing: 8 }}>{mapWeatherDescription(weatherToday.weather[0].description)}</Typography>
              <Typography variant="h2">{(weatherToday.main.temp - 273.15).toFixed(0)}&deg;C</Typography>
              <Typography>
                <strong>{currentDay}</strong>{" "}
                <span style={{ color: "#757575" }}>{currentDate}</span>
              </Typography>
            </Grid>
          </>
          )}
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ minWidth: '20%', border: '1px solid black', borderRadius: '20px' }} textAlign={'center'}>{CITY} City</Typography>
          </Grid>

          <Grid item xs={12} mt={4} textAlign={'start'}>
            <Typography variant="h6"><strong>Next days Forecasts</strong></Typography>
          </Grid>

          <Grid item xs={6}>
            <Paper
              sx={{
                borderRadius: 5,
                p: 1,
                textAlign: 'center',
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                minHeight: '150px',
                padding: '20px'
              }}
            >
              <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={6}>
                  <Image src="/3d-weather-icons/cloud/22.png" alt="sample" width={40} height={40} style={{ borderRadius: "10%" }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="right">
                    <strong>25&deg;C</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: '13px' }}>
                    <strong>Friday</strong>{" "}
                    <span style={{ color: "#757575" }}>May 10, 2024</span>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              sx={{
                borderRadius: 5,
                p: 1,
                textAlign: 'center',
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                minHeight: '150px',
                padding: '20px'
              }}
            >
              <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={6}>
                  <Image src="/3d-weather-icons/sun/6.png" alt="sample" width={50} height={40} style={{ borderRadius: "10%" }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="right">
                    <strong>39&deg;C</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: '13px' }}>
                    <strong>Friday</strong>{" "}
                    <span style={{ color: "#757575" }}>May 11, 2024</span>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              sx={{
                borderRadius: 5,
                p: 1,
                textAlign: 'center',
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                minHeight: '150px',
                padding: '20px'
              }}
            >
              <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={6}>
                  <Image src="/3d-weather-icons/sun/27.png" alt="sample" width={40} height={40} style={{ borderRadius: "10%" }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="right">
                    <strong>32&deg;C</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: '13px' }}>
                    <strong>Friday</strong>{" "}
                    <span style={{ color: "#757575" }}>May 12, 2024</span>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              sx={{
                borderRadius: 5,
                p: 1,
                textAlign: 'center',
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                minHeight: '150px',
                padding: '20px'
              }}
            >
              <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={6}>
                  <Image src="/3d-weather-icons/rain/39.png" alt="sample" width={40} height={40} style={{ borderRadius: "10%" }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="right">
                    <strong>23&deg;C</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: '13px' }}>
                    <strong>Friday</strong>{" "}
                    <span style={{ color: "#757575" }}>May 13, 2024</span>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} mt={4} textAlign={'start'}>
            <Typography variant="body2"><strong>Sorsogon Map Weather Precipitation</strong></Typography>
          </Grid>

          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <Image src="/image/image.png" alt="sample" width={320} height={200} style={{ borderRadius: '10%', boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)' }} />
          </Grid>
        </Grid>
    </>
  );
}
