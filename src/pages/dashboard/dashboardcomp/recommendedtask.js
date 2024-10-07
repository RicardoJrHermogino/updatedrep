import React from 'react';
import { Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { useRouter } from 'next/router'; // Use this if you're in a Next.js app

const RecommendedTask = () => {
  const router = useRouter(); // Initialize router

  const handleSeeMore = () => {
    router.push('/dashboard/dashboardcomp/RecommendedTaskPage');
  };

  return (
    <>
      <Grid item xs={12} textAlign="center">
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Recommended Tasks
        </Typography>
      </Grid>

      <Grid item xs={12} md={12} lg={12} textAlign="center">
        <Grid xs={12} md={12} lg={12} sx={{ width: '100%', px: 2 }}>
          <Card sx={{ borderRadius: 7, boxShadow: 2, maxWidth: 500, margin: 'auto' }}>
            <CardContent>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12} textAlign="center">
                  <Typography variant="body1">No tasks available.</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSeeMore}
              sx={{ margin: 2 }} // Add some margin for better spacing
            >
              See More
            </Button>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default RecommendedTask;
