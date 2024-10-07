import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Grid, CssBaseline } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import Image from "next/image";
import { useRouter } from 'next/router';
import getOrCreateUUID from '../../utils/uuid'; // Adjust the import path as necessary


const WelcomeGreetings = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // State to ensure client-side rendering
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const userId = getOrCreateUUID();
    console.log('User ID:', userId);
  }, []);
  // Ensure this runs only on the client-side after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGetStartedClick = () => {
    // Trigger exit animation
    setIsExiting(true);

    // After animation is done, navigate to the next page
    setTimeout(() => {
      router.push('/dashboard');
    }, 300); // Match the duration of the animation (300ms)
  };

  const gradientStyle = {
    padding: "20px",
    borderRadius: "5px",
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        {isClient && (
          <AnimatePresence>
            {!isExiting && ( // Conditionally render based on isExiting state
              <motion.div
                initial={{ opacity: 0, x: 50 }} // Initial animation
                animate={{ opacity: 1, x: 0 }} // Animation when entering
                exit={{ opacity: 0 }} // Exit animation (fade out) // Exit animation
                transition={{ duration: 0.5 }} // Duration of the animation
                style={{ width: '100%' }}
              >
                <Grid container justifyContent="center" spacing={3} style={gradientStyle}>
                  <Grid item xs={12} md={12} mt={3}>
                    <Typography variant="h5" align="center" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                      <strong> Efficiently Plan Your Coconut Farm Tasks</strong>
                    </Typography>
                  </Grid>

                  <Grid container justifyContent="center" alignItems="center" mt={18} item xs={6}>
                    {/* Increased width and height */}
                    <Image src="/image/coconutgraphic.svg" alt="sample" width={260} height={260} />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} mt={18}>
                    <Typography variant="body2" align="center" mb={3} gutterBottom sx={{ color: 'gray' }}>
                      TaskWeatherSync: Start Your Weather-Informed Task Management Journey Now
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: '30px', 
                        fontWeight: 'bold', 
                        height: '65px',
                        backgroundColor:"black"
                                }}
                        onClick={handleGetStartedClick}
                    >
                      Get Started
                    </Button>
                  </Grid>
                </Grid>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </Container>
    </>
  );
};

export default WelcomeGreetings;