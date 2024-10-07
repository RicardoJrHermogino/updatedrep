import { FormControl, InputLabel, Select, MenuItem, Grid, OutlinedInput } from "@mui/material";
import dayjs from "dayjs";

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  // Generate an array of the next 5 dates
  const nextFiveDays = Array.from({ length: 6 }, (_, i) =>
    dayjs().add(i, 'day').format("YYYY-MM-DD")
  );

  return (
    <Grid item xs={6} md={6} lg={6} align="center">
      <FormControl fullWidth variant="outlined">
        <InputLabel id="date-select-label">Date</InputLabel>
        <Select
          labelId="date-select-label"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          label="Date"
          input={<OutlinedInput label="Date" />}
          sx={{
            borderRadius: '10px', // Ensures the outline is rounded
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px', // Rounds the input itself
            },
            '& fieldset': {
              borderRadius: '10px', // Rounds the border for the dropdown
            }, backgroundColor:'#f5f7fa ',
          }}
        >
          {nextFiveDays.map((date) => (
            <MenuItem key={date} value={date}>
              {dayjs(date).format('dddd, MMMM D, YYYY')}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default DatePicker;
