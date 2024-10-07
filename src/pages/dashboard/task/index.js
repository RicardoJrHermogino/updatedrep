import React, { useState } from 'react';
import { Container, Grid, Typography, CssBaseline, Button, FormHelperText, Paper, IconButton, Badge } from '@mui/material';
import Navbar from '../../components/navbar';
import { useRouter } from 'next/router';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings'; // Import the settings icon
import NotificationsIcon from '@mui/icons-material/Notifications'; // Import the notifications icon
import AllScheduled from './task_components/all_scheduled';
import AffectedTask from './task_components/affected_task';
import FavorableTask from './task_components/favorable_task';

const gradientStyle = {
  padding: "20px",
  borderRadius: "5px"
};

const bottomLineStyle = {
  borderBottom: "0.5px solid gray",
  padding: "10px 15px",
  marginBottom: '8px',
  display: 'flex',
  alignItems: 'center',
};

const Tasks = () => {
  const router = useRouter();
  const { tab } = router.query; // Get the current tab from the query
  const [activeTab, setActiveTab] = useState(tab || 'all'); // State to manage the active tab

  const handleAddNewTask = () => {
    router.push('/dashboard/task/task_components/ScheduleTask');
  };

  const handleSeeMore = () => {
    router.push('/dashboard/task/task_components/restricted_task');
  };

  const handleTabClick = (newTab) => {
    setActiveTab(newTab);
    router.push(`?tab=${newTab}`); // Update the URL query parameter
  };

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Grid container spacing={5} style={gradientStyle} mb={15} justifyContent={'center'}>

        <Grid item xs={6}>
          <Typography variant="h4"><strong>Task</strong></Typography>
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

        <Grid item xs={12} md={12} align="center">
          <Button onClick={handleAddNewTask} variant="contained" sx={{ borderRadius: '20px', bgcolor: 'black', minWidth: '100%', minHeight: '100%' }}>
            Schedule New Task
          </Button>
          <FormHelperText sx={{ textAlign: 'center' }}>Schedule your planned task here.</FormHelperText>
        </Grid>

        {/* Task Buttons */}
        <Grid item xs={4} mt={2} textAlign={'center'}>
          <Paper
            elevation={3}
            sx={{
              p: 1,
              borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              bgcolor: activeTab === 'all' ? 'black' : 'transparent',
              color: activeTab === 'all' ? 'white' : 'black',
              width: '80%', // Adjusted width
              margin: '0 auto', // Centering the button
            }}
            onClick={() => handleTabClick('all')}
          >
            <AssignmentIcon sx={{ fontSize: '1.5rem' }} />
          </Paper>
          <Typography variant="subtitle1" sx={{ fontSize: '0.8rem', mt: 0.7 }}>
            All
          </Typography>
        </Grid>

        <Grid item xs={4} mt={2} textAlign={'center'}>
          <Paper
            elevation={3}
            sx={{
              p: 1,
              borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              bgcolor: activeTab === 'favorable' ? 'black' : 'transparent',
              color: activeTab === 'favorable' ? 'white' : 'black',
              width: '80%', // Adjusted width
              margin: '0 auto', // Centering the button
            }}
            onClick={() => handleTabClick('favorable')}
          >
            <AssignmentLateIcon sx={{ fontSize: '1.5rem' }} />
          </Paper>
          <Typography variant="subtitle1" sx={{ fontSize: '0.8rem', mt: 0.7 }}>
            Favorable
          </Typography>
        </Grid>

        <Grid item xs={4} mt={2} textAlign={'center'}>
          <Paper
            elevation={3}
            sx={{
              p: 1,
              borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              bgcolor: activeTab === 'affected' ? 'black' : 'transparent',
              color: activeTab === 'affected' ? 'white' : 'black',
              width: '80%', // Adjusted width
              margin: '0 auto', // Centering the button
            }}
            onClick={() => handleTabClick('affected')}
          >
            <AssignmentLateIcon sx={{ fontSize: '1.5rem' }} />
          </Paper>
          <Typography variant="subtitle1" sx={{ fontSize: '0.8rem', mt: 0.7 }}>
            Affected
          </Typography>
        </Grid>

        <Grid item xs={12}>
          {activeTab === 'all' && <AllScheduled />}
          {activeTab === 'favorable' && <FavorableTask />}
          {activeTab === 'affected' && <AffectedTask />}
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container>
            <Grid item xs={12} sx={{ ...bottomLineStyle }}>
              <AssignmentTurnedInIcon sx={{ marginRight: '29px', fontSize: '23px' }} />
              <Typography variant="subtitle1" sx={{ fontSize: '0.9rem' }}>Scheduled Task</Typography>
              <ArrowForwardIosIcon sx={{ fontSize: '0.875rem', marginLeft: '150px' }} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={5} style={{ padding: '20px', borderRadius: '20px', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)' }}>
            <Grid container textAlign={'center'} spacing={1} p={1}>
              <React.Fragment>
                <Grid item xs={12} md={4}>
                  <Typography>Harvest Rice</Typography>
                </Grid>
                <Grid item xs={12}>
                  <hr style={{ borderTop: '1px solid gray' }} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography>Harvest Rice</Typography>
                </Grid>
                <Grid item xs={12}>
                  <hr style={{ borderTop: '1px solid gray', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography>Harvest Rice</Typography>
                </Grid>
                <Grid item xs={12}>
                  <hr style={{ borderTop: '1px solid gray', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }} />
                </Grid>
              </React.Fragment>
            </Grid>
            <Grid item xs={12} textAlign={'center'}>
              <Button onClick={handleSeeMore}>See More</Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Tasks;
