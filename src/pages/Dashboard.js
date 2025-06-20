import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import EngagementChart from '../components/EngagementChart';
import PlatformDistributionChart from '../components/PlatformDistributionChart';
import RecentPostsTable from '../components/RecentPostsTable';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSocialMediaData } from '../redux/socialMediaSlice';
import DashboardFilter from '../components/DashboardFilter';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.socialMedia);

  React.useEffect(() => {
    dispatch(fetchSocialMediaData());
  }, [dispatch]);

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
        <Typography variant="h5" color="primary">Loading dashboard data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3, bgcolor: '#ffebee' }}>
          <Typography variant="h5" color="error">Error loading dashboard data: {error}</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Social Media Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Overview of your social media performance across all platforms
        </Typography>

        <DashboardFilter />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4, mt: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={itemVariants}>
                <StatCard 
                  platform="Facebook" 
                  icon="facebook" 
                  value={data?.platforms?.facebook?.followers || 0} 
                  label="Followers" 
                  change={data?.platforms?.facebook?.growth || 0} 
                />
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={itemVariants}>
                <StatCard 
                  platform="Twitter" 
                  icon="twitter" 
                  value={data?.platforms?.twitter?.followers || 0} 
                  label="Followers" 
                  change={data?.platforms?.twitter?.growth || 0} 
                />
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={itemVariants}>
                <StatCard 
                  platform="Instagram" 
                  icon="instagram" 
                  value={data?.platforms?.instagram?.followers || 0} 
                  label="Followers" 
                  change={data?.platforms?.instagram?.growth || 0} 
                />
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div variants={itemVariants}>
                <StatCard 
                  platform="LinkedIn" 
                  icon="linkedin" 
                  value={data?.platforms?.linkedin?.followers || 0} 
                  label="Followers" 
                  change={data?.platforms?.linkedin?.growth || 0} 
                />
              </motion.div>
            </Grid>
          </Grid>

          {/* Charts */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
              <motion.div variants={itemVariants}>
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                  <EngagementChart data={data?.historical} />
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                  <PlatformDistributionChart data={data?.platforms} />
                </Paper>
              </motion.div>
            </Grid>
          </Grid>

          {/* Recent Posts Table */}
          <motion.div variants={itemVariants}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <RecentPostsTable data={data?.recentPosts} />
            </Paper>
          </motion.div>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Dashboard;
