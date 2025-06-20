import React from 'react';
import { Box, Container, Typography, Grid, Paper, Tabs, Tab, Card, CardContent, Avatar, Chip, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSocialMediaData } from '../redux/socialMediaSlice';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import AudienceFilter from '../components/AudienceFilter';

const Audience = () => {
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
        <Typography variant="h5" color="primary">Loading audience data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3, bgcolor: '#ffebee' }}>
          <Typography variant="h5" color="error">Error loading audience data: {error}</Typography>
        </Paper>
      </Box>
    );
  }

  // Sample audience demographics data
  const demographicsData = {
    age: [
      { name: '18-24', value: 28 },
      { name: '25-34', value: 35 },
      { name: '35-44', value: 22 },
      { name: '45-54', value: 10 },
      { name: '55+', value: 5 }
    ],
    gender: [
      { name: 'Male', value: 48 },
      { name: 'Female', value: 51 },
      { name: 'Other', value: 1 }
    ],
    location: [
      { name: 'United States', value: 35 },
      { name: 'United Kingdom', value: 15 },
      { name: 'Canada', value: 12 },
      { name: 'Australia', value: 8 },
      { name: 'Germany', value: 7 },
      { name: 'France', value: 6 },
      { name: 'Other', value: 17 }
    ],
    interests: [
      { name: 'Technology', value: 42 },
      { name: 'Fashion', value: 38 },
      { name: 'Travel', value: 35 },
      { name: 'Food', value: 30 },
      { name: 'Fitness', value: 28 },
      { name: 'Music', value: 25 },
      { name: 'Movies', value: 22 }
    ],
    devices: [
      { name: 'Mobile', value: 68 },
      { name: 'Desktop', value: 27 },
      { name: 'Tablet', value: 5 }
    ]
  };

  // Sample audience growth data
  const growthData = {
    monthly: [
      { name: 'Jan', value: 12500 },
      { name: 'Feb', value: 13200 },
      { name: 'Mar', value: 14800 },
      { name: 'Apr', value: 16500 },
      { name: 'May', value: 18200 },
      { name: 'Jun', value: 21000 }
    ],
    platforms: [
      { name: 'Facebook', value: 2.5 },
      { name: 'Twitter', value: 1.8 },
      { name: 'Instagram', value: 4.2 },
      { name: 'LinkedIn', value: 1.2 }
    ]
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Audience Insights
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Understand your audience demographics and behavior across platforms
        </Typography>

        <AudienceFilter />

        <Paper sx={{ p: 2, mb: 4, mt: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Demographics" />
            <Tab label="Growth" />
            <Tab label="Engagement" />
            <Tab label="Behavior" />
          </Tabs>
        </Paper>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Demographics Tab */}
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Age Distribution</Typography>
                    <Box sx={{ height: 300 }}>
                      <PieChart data={demographicsData.age} />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Gender Distribution</Typography>
                    <Box sx={{ height: 300 }}>
                      <PieChart data={demographicsData.gender} />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Geographic Distribution</Typography>
                    <Box sx={{ height: 400 }}>
                      <BarChart data={demographicsData.location} />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Interests</Typography>
                    <Box sx={{ height: 300 }}>
                      <BarChart data={demographicsData.interests} />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Device Usage</Typography>
                    <Box sx={{ height: 300 }}>
                      <PieChart data={demographicsData.devices} />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          )}

          {/* Growth Tab */}
          {tabValue === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Monthly Audience Growth</Typography>
                    <Box sx={{ height: 400 }}>
                      <BarChart data={growthData.monthly} />
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Growth Rate by Platform (%)</Typography>
                    <Box sx={{ p: 2 }}>
                      {growthData.platforms.map((platform) => (
                        <Box key={platform.name} sx={{ mb: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">{platform.name}</Typography>
                            <Typography variant="body2" fontWeight="bold" color={platform.value > 0 ? 'success.main' : 'error.main'}>
                              {platform.value > 0 ? `+${platform.value}%` : `${platform.value}%`}
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={Math.abs(platform.value) * 10} 
                            color={platform.value > 0 ? 'success' : 'error'}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>New Followers</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', py: 4 }}>
                      <Typography variant="h3" color="primary" fontWeight="bold">2,845</Typography>
                      <Typography variant="body2" color="text.secondary">Last 30 days</Typography>
                      <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>+18.5% from previous period</Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Follower Retention</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', py: 4 }}>
                      <Typography variant="h3" color="primary" fontWeight="bold">94.2%</Typography>
                      <Typography variant="body2" color="text.secondary">Last 30 days</Typography>
                      <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>+2.1% from previous period</Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          )}

          {/* Engagement Tab */}
          {tabValue === 2 && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Engagement data is available in the Analytics section
              </Typography>
            </Box>
          )}

          {/* Behavior Tab */}
          {tabValue === 3 && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Behavior analysis coming soon
              </Typography>
            </Box>
          )}
        </motion.div>
      </Box>
    </Container>
  );
};

export default Audience;
