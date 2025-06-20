import React from 'react';
import { Box, Container, Typography, Grid, Paper, Tabs, Tab, Card, CardContent, Switch, FormControlLabel, TextField, Button, Divider, Slider, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSocialMediaData } from '../redux/socialMediaSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.socialMedia);
  const [tabValue, setTabValue] = React.useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [refreshInterval, setRefreshInterval] = React.useState(30);
  const [defaultPlatform, setDefaultPlatform] = React.useState('all');

  React.useEffect(() => {
    dispatch(fetchSocialMediaData());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleRefreshIntervalChange = (event, newValue) => {
    setRefreshInterval(newValue);
  };

  const handleDefaultPlatformChange = (event) => {
    setDefaultPlatform(event.target.value);
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
        <Typography variant="h5" color="primary">Loading settings...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3, bgcolor: '#ffebee' }}>
          <Typography variant="h5" color="error">Error loading settings: {error}</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Settings
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Customize your dashboard experience and preferences
        </Typography>

        <Paper sx={{ p: 2, mb: 4, mt: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="General" />
            <Tab label="Notifications" />
            <Tab label="Account" />
            <Tab label="API Connections" />
          </Tabs>
        </Paper>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* General Settings Tab */}
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Appearance</Typography>
                    <Box sx={{ mb: 3 }}>
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={darkMode} 
                            onChange={() => setDarkMode(!darkMode)}
                            color="primary"
                          />
                        }
                        label="Dark Mode"
                      />
                    </Box>
                    <Divider sx={{ my: 3 }} />
                    
                    <Typography variant="h6" gutterBottom>Dashboard Preferences</Typography>
                    <Box sx={{ mb: 3 }}>
                      <Typography gutterBottom>Data Refresh Interval (seconds)</Typography>
                      <Slider
                        value={refreshInterval}
                        onChange={handleRefreshIntervalChange}
                        aria-labelledby="refresh-interval-slider"
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={10}
                        max={120}
                        sx={{ maxWidth: 400 }}
                      />
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="default-platform-label">Default Platform</InputLabel>
                        <Select
                          labelId="default-platform-label"
                          id="default-platform-select"
                          value={defaultPlatform}
                          label="Default Platform"
                          onChange={handleDefaultPlatformChange}
                        >
                          <MenuItem value="all">All Platforms</MenuItem>
                          <MenuItem value="facebook">Facebook</MenuItem>
                          <MenuItem value="twitter">Twitter</MenuItem>
                          <MenuItem value="instagram">Instagram</MenuItem>
                          <MenuItem value="linkedin">LinkedIn</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                      Save Changes
                    </Button>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          )}

          {/* Notifications Tab */}
          {tabValue === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Notification Settings</Typography>
                    <Box sx={{ mb: 3 }}>
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={notificationsEnabled} 
                            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                            color="primary"
                          />
                        }
                        label="Enable Notifications"
                      />
                    </Box>
                    
                    <Box sx={{ mb: 3, ml: 3 }}>
                      <FormControlLabel
                        disabled={!notificationsEnabled}
                        control={
                          <Switch 
                            checked={emailNotifications} 
                            onChange={() => setEmailNotifications(!emailNotifications)}
                            color="primary"
                          />
                        }
                        label="Email Notifications"
                      />
                    </Box>
                    
                    <Box sx={{ mb: 3, ml: 3 }}>
                      <FormControlLabel
                        disabled={!notificationsEnabled}
                        control={
                          <Switch 
                            checked={pushNotifications} 
                            onChange={() => setPushNotifications(!pushNotifications)}
                            color="primary"
                          />
                        }
                        label="Push Notifications"
                      />
                    </Box>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Typography variant="h6" gutterBottom>Notification Events</Typography>
                    <Box sx={{ mb: 3 }}>
                      <FormControlLabel
                        disabled={!notificationsEnabled}
                        control={<Switch defaultChecked color="primary" />}
                        label="High Engagement Posts"
                      />
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <FormControlLabel
                        disabled={!notificationsEnabled}
                        control={<Switch defaultChecked color="primary" />}
                        label="Follower Milestones"
                      />
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <FormControlLabel
                        disabled={!notificationsEnabled}
                        control={<Switch defaultChecked color="primary" />}
                        label="Performance Reports"
                      />
                    </Box>
                    
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                      Save Changes
                    </Button>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          )}

          {/* Account Tab */}
          {tabValue === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Account Information</Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          defaultValue="John Doe"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          defaultValue="john.doe@example.com"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Typography variant="h6" gutterBottom>Change Password</Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="Current Password"
                          type="password"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="New Password"
                          type="password"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="Confirm New Password"
                          type="password"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                      Update Account
                    </Button>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          )}

          {/* API Connections Tab */}
          {tabValue === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Connected Platforms</Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Card sx={{ mb: 2, bgcolor: '#e3f2fd' }}>
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="subtitle1">Facebook</Typography>
                            <Typography variant="body2" color="text.secondary">Connected on Apr 5, 2023</Typography>
                          </Box>
                          <Button variant="outlined" color="primary" size="small">
                            Disconnect
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card sx={{ mb: 2, bgcolor: '#e8f5e9' }}>
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="subtitle1">Twitter</Typography>
                            <Typography variant="body2" color="text.secondary">Connected on Apr 5, 2023</Typography>
                          </Box>
                          <Button variant="outlined" color="primary" size="small">
                            Disconnect
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card sx={{ mb: 2, bgcolor: '#fff8e1' }}>
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="subtitle1">Instagram</Typography>
                            <Typography variant="body2" color="text.secondary">Connected on Apr 5, 2023</Typography>
                          </Box>
                          <Button variant="outlined" color="primary" size="small">
                            Disconnect
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card sx={{ mb: 2, bgcolor: '#e0f7fa' }}>
                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="subtitle1">LinkedIn</Typography>
                            <Typography variant="body2" color="text.secondary">Connected on Apr 5, 2023</Typography>
                          </Box>
                          <Button variant="outlined" color="primary" size="small">
                            Disconnect
                          </Button>
                        </CardContent>
                      </Card>
                    </Box>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Typography variant="h6" gutterBottom>Add New Connection</Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Button variant="contained" color="primary" startIcon={<span>+</span>}>
                        Add Platform
                      </Button>
                      <Button variant="outlined">
                        Refresh Connections
                      </Button>
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

export default Settings;
