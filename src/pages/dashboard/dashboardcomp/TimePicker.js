import { TimePicker } from '@mui/x-date-pickers';
import { TextField, Grid } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const CustomTimePicker = ({ selectedTime, setSelectedTime }) => {
  // On component mount, check if a saved time exists in localStorage
  useEffect(() => {
    const savedTime = localStorage.getItem("selectedTime");
    if (savedTime) {
      setSelectedTime(savedTime);
    }
  }, []);

  // Save time to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedTime", selectedTime);
  }, [selectedTime]);

  return (
    <Grid item xs={6} md={6} lg={6} align="center">
      <TimePicker
        label="Time"
        value={dayjs(selectedTime, 'HH:mm')} // Ensure correct parsing
        onAccept={(newValue) => { // Trigger only on "OK" button click
          if (newValue) {
            setSelectedTime(newValue.format('HH:mm')); // Store in HH:mm format
          }
        }}
        renderInput={(params) => (
          <TextField 
            {...params}
            sx={{
              '& .MuiInputBase-input': {
                backgroundColor: '#f5f7fa', // Set the input background color
                borderRadius: '10px',
                textAlign: 'center', // Center the text
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px', // Round the input's border
              },
              '& fieldset': {
                borderRadius: '10px', // Ensure the border is rounded
              },
            }}
          />
        )}
      />
    </Grid>
  );
};

export default CustomTimePicker;
