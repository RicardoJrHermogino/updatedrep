import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, CssBaseline } from '@mui/material';
import { motion } from 'framer-motion'; // Import framer-motion
import Image from "next/image";
import { useRouter } from 'next/router';

const WelcomeGreetings = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // State to ensure client-side rendering

  // Ensure this runs only on the client-side after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGetStartedClick = () => {
    router.push('/dashboard');
  };

  const gradientStyle = {
    padding: "20px",
    borderRadius: "5px",
  };

  return (
    <>
      <CssBaseline/>
      <Container maxWidth="sm">
      {isClient && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ width: '100%' }}
            >
        <Grid container justifyContent="center" spacing={3} style={gradientStyle}>
        
          <Grid item xs={12} md={12} mt={3} >
            <Typography variant="h5" align="center" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              <strong> Efficiently Plan Your Coconut Farm Tasks</strong> 
            </Typography>
          </Grid>

          <Grid container justifyContent="center" alignItems="center" mt={18} item xs={6}>
            {/* Increased width and height */}
            <Image src="/image/coconutgraphic.svg" alt="sample" width={260} height={260} />
          </Grid>

          <Grid item xs={12} sm={12} md={12} mt={18} >
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
              Get Started
            </Button>
          </Grid>
          
        </Grid>
        </motion.div>
          )}
      </Container>
    </>
  );
};

export default WelcomeGreetings;
