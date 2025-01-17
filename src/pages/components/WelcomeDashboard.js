import React, { useState } from 'react';
import { Container, Typography, Button, Grid, CssBaseline } from '@mui/material'; // Import useTheme hook
import Image from "next/image";
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const WelcomeDashboard = () => {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  

  const gradientStyle = {
    padding: "20px",
    borderRadius: "5px",
  };

  const handleGetStartedClick = () => {
    // Trigger exit animation
    setIsExiting(true);

    // After animation is done, navigate to the next page
    setTimeout(() => {
      router.push('/welcome/greetings');
    }, 800); // Match the duration of the animation (800ms)
  };

  return (
    <>
    <CssBaseline/>
    <Container maxWidth="sm">
    <motion.div
        initial={{ opacity: 1, x: 0 }} // Normal when accessed
        animate={isExiting ? { x: -1000, opacity: 0 } : {}} // Slide out to left on exit
        transition={{ duration: 0.8 }} // Duration of the exit transition
        style={{ width: '100%' }}
      >
      <Grid container justifyContent="center" spacing={3} style={gradientStyle}>
        <Grid item xs={12} md={12} mt={3} >
          <Typography variant="h5" align="center" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            <strong> Discover TaskWeatherSync Smart Scheduler</strong> 
          </Typography>
        </Grid>

        <Grid container justifyContent="center" alignItems="center" mt={14} item xs={6}>
          <Image src="/3d-weather-icons/sun/16.png" alt="sample" width={260} height={260} />
        </Grid>

        <Grid item xs={12} sm={12} md={12} mt={22} >
          <Typography variant="body2" align="center" mb={3} gutterBottom sx={{color: 'gray'}}>
            TaskWeatherSync: Start Your Weather-Informed Task Management Journey Now
          </Typography>
          
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ 
              borderRadius: '20px', 
              fontWeight: 'bold', 
              height: '55px',
            }}
            onClick={handleGetStartedClick}
          >
            Next
          </Button>
        </Grid>
      </Grid>
      </motion.div>
    </Container>
    </>
  );
};

export default WelcomeDashboard;
