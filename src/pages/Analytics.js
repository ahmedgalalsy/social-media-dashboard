import React from 'react';
import { Box, Container, Typography, Grid, Paper, Tab, Tabs } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSocialMediaData } from '../redux/socialMediaSlice';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import AnalyticsFilter from '../components/AnalyticsFilter';

const Analytics = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.socialMedia);
  const [tabValue, setTabValue] = React.useState(0);

  React.useEffect(() => {
    dispatch(fetchSocialMediaData());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Typography variant="h5" color="primary">Loading analytics data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3, bgcolor: '#ffebee' }}>
          <Typography variant="h5" color="error">Error loading analytics data: {error}</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Analytics
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Detailed analytics and insights for your social media performance
        </Typography>

        <AnalyticsFilter />

        <Paper sx={{ p: 2, mb: 4, mt: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Engagement" />
            <Tab label="Reach" />
            <Tab label="Conversions" />
            <Tab label="Demographics" />
          </Tabs>
        </Paper>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tab Content */}
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Engagement by Platform</Typography>
                    <Box sx={{ height: 400 }}>
                      <BarChart 
                        data={[
                          { name: 'Facebook', value: 4200 },
                          { name: 'Twitter', value: 3800 },
                          { name: 'Instagram', value: 9500 },
                          { name: 'LinkedIn', value: 2300 },
                        ]} 
                      />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Engagement Rate Trend</Typography>
                    <Box sx={{ height: 300 }}>
                      <LineChart 
                        data={[
                          { name: 'Jan', value: 2.4 },
                          { name: 'Feb', value: 2.8 },
                          { name: 'Mar', value: 3.2 },
                          { name: 'Apr', value: 3.6 },
                          { name: 'May', value: 3.1 },
                          { name: 'Jun', value: 3.5 },
                        ]} 
                      />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Engagement by Content Type</Typography>
                    <Box sx={{ height: 300 }}>
                      <BarChart 
                        data={[
                          { name: 'Photos', value: 6500 },
                          { name: 'Videos', value: 8200 },
                          { name: 'Links', value: 3100 },
                          { name: 'Text', value: 2400 },
                        ]} 
                      />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          )}

          {tabValue === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Reach by Platform</Typography>
                    <Box sx={{ height: 400 }}>
                      <BarChart 
                        data={[
                          { name: 'Facebook', value: 12500 },
                          { name: 'Twitter', value: 8700 },
                          { name: 'Instagram', value: 18900 },
                          { name: 'LinkedIn', value: 5400 },
                        ]} 
                      />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Reach Growth Trend</Typography>
                    <Box sx={{ height: 300 }}>
                      <LineChart 
                        data={[
                          { name: 'Jan', value: 8500 },
                          { name: 'Feb', value: 9200 },
                          { name: 'Mar', value: 11500 },
                          { name: 'Apr', value: 14200 },
                          { name: 'May', value: 13800 },
                          { name: 'Jun', value: 15600 },
                        ]} 
                      />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          )}

          {tabValue === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Conversion Rate by Platform</Typography>
                    <Box sx={{ height: 400 }}>
                      <BarChart 
                        data={[
                          { name: 'Facebook', value: 2.8 },
                          { name: 'Twitter', value: 1.9 },
                          { name: 'Instagram', value: 3.2 },
                          { name: 'LinkedIn', value: 4.1 },
                        ]} 
                      />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Conversion Trend</Typography>
                    <Box sx={{ height: 300 }}>
                      <LineChart 
                        data={[
                          { name: 'Jan', value: 1.8 },
                          { name: 'Feb', value: 2.1 },
                          { name: 'Mar', value: 2.4 },
                          { name: 'Apr', value: 2.9 },
                          { name: 'May', value: 2.7 },
                          { name: 'Jun', value: 3.2 },
                        ]} 
                      />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Conversion by Campaign</Typography>
                    <Box sx={{ height: 300 }}>
                      <BarChart 
                        data={[
                          { name: 'Summer Sale', value: 4.2 },
                          { name: 'Product Launch', value: 3.8 },
                          { name: 'Holiday Special', value: 5.1 },
                          { name: 'Brand Awareness', value: 2.3 },
                        ]} 
                      />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          )}

          {tabValue === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Age Distribution</Typography>
                    <Box sx={{ height: 300 }}>
                      <BarChart 
                        data={[
                          { name: '18-24', value: 28 },
                          { name: '25-34', value: 35 },
                          { name: '35-44', value: 22 },
                          { name: '45-54', value: 10 },
                          { name: '55+', value: 5 },
                        ]} 
                      />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Gender Distribution</Typography>
                    <Box sx={{ height: 300 }}>
                      <BarChart 
                        data={[
                          { name: 'Male', value: 48 },
                          { name: 'Female', value: 51 },
                          { name: 'Other', value: 1 },
                        ]} 
                      />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Geographic Distribution</Typography>
                    <Box sx={{ height: 400 }}>
                      <BarChart 
                        data={[
                          { name: 'North America', value: 42 },
                          { name: 'Europe', value: 28 },
                          { name: 'Asia', value: 18 },
                          { name: 'South America', value: 7 },
                          { name: 'Africa', value: 3 },
                          { name: 'Oceania', value: 2 },
                        ]} 
                      />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          )}
        </motion.div>
      </Box>
    </Container>
  );
};

export default Analytics;
