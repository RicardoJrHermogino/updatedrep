import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import Image from "next/image";

const WeatherDisplay = ({ currentDate, weatherCondition, temperature }) => {
  // Set the static path for the weather icon
  const weatherIconPath = "/3d-weather-icons/sun/27.png"; // Replace this with your desired icon path

  // Extract only the date part from the currentDate
  const displayDate = new Date(currentDate).toLocaleDateString();

  return (
    <Grid item xs={12}>
      <Card
        sx={{
          borderRadius: 7,
          backgroundColor: "#302c2c",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <CardContent>
          <Grid container sx={{ textAlign: "center" }}>
            <Grid item xs={3} mt={2}>  
              <Image
                src={weatherIconPath} // Use the static icon path
                alt="weather-icon"
                width={80}
                height={80}
              />
            </Grid>
            <Grid item xs={6} mt={4} align="start">
              <Typography variant="subtitle2" color="#fff" ml={5}>
                <span>{displayDate}</span>
              </Typography>
              <Typography color="#fff" ml={5}>
                {weatherCondition ? weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1) : " ..."}
              </Typography>
            </Grid>
            <Grid item xs={3} mt={4}>
              <Typography variant="h4" color="#fff">
                <strong>{temperature !== null ? `${temperature}°C` : "Loading..."}</strong>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WeatherDisplay;
