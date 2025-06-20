import React from 'react';
import { Box, Container, Typography, Grid, Paper, Tabs, Tab, Card, CardContent, Avatar, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSocialMediaData } from '../redux/socialMediaSlice';
import RecentPostsTable from '../components/RecentPostsTable';
import PostsFilter from '../components/PostsFilter';

const Posts = () => {
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
        <Typography variant="h5" color="primary">Loading posts data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3, bgcolor: '#ffebee' }}>
          <Typography variant="h5" color="error">Error loading posts data: {error}</Typography>
        </Paper>
      </Box>
    );
  }

  // Sample featured posts data
  const featuredPosts = [
    {
      id: 1,
      platform: 'Instagram',
      content: 'Our new product launch was a huge success! Thanks to everyone who participated. #NewProduct #Launch',
      engagement: 12500,
      status: 'high',
      date: '2023-04-10',
      image: 'https://source.unsplash.com/random/300x200?product=1'
    },
    {
      id: 2,
      platform: 'Facebook',
      content: "We're excited to announce our partnership with XYZ Corp to bring you innovative solutions!",
      engagement: 8700,
      status: 'high',
      date: '2023-04-08',
      image: 'https://source.unsplash.com/random/300x200?business=1'
    },
    {
      id: 3,
      platform: 'Twitter',
      content: 'Join our webinar next week to learn about the latest industry trends and how to stay ahead of the competition.',
      engagement: 5400,
      status: 'medium',
      date: '2023-04-05',
      image: 'https://source.unsplash.com/random/300x200?webinar=1'
    }
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Posts Management
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Manage and analyze your social media posts across all platforms
        </Typography>

        <PostsFilter />

        <Paper sx={{ p: 2, mb: 4, mt: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="All Posts" />
            <Tab label="Featured Posts" />
            <Tab label="Scheduled Posts" />
            <Tab label="Draft Posts" />
          </Tabs>
        </Paper>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tab Content */}
          {tabValue === 0 && (
            <motion.div variants={itemVariants}>
              <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                <RecentPostsTable data={data?.recentPosts} title="All Posts" />
              </Paper>
            </motion.div>
          )}

          {tabValue === 1 && (
            <Grid container spacing={3}>
              {featuredPosts.map((post) => (
                <Grid item xs={12} md={4} key={post.id}>
                  <motion.div variants={itemVariants}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%' }}>
                      <Box sx={{ position: 'relative' }}>
                        <Box 
                          component="img"
                          src={post.image}
                          alt={`Post from ${post.platform}`}
                          sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                        />
                        <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                          <Chip 
                            label={post.platform} 
                            color={
                              post.platform === 'Facebook' ? 'primary' : 
                              post.platform === 'Twitter' ? 'info' : 
                              post.platform === 'Instagram' ? 'secondary' : 
                              'default'
                            }
                            size="small"
                          />
                        </Box>
                      </Box>
                      <CardContent>
                        <Typography variant="body1" gutterBottom>
                          {post.content}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                          <Typography variant="caption" color="text.secondary">
                            {post.date}
                          </Typography>
                          <Chip 
                            label={`${post.engagement.toLocaleString()} engagements`} 
                            size="small" 
                            color={post.status === 'high' ? 'success' : 'primary'}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 2 && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No scheduled posts available
              </Typography>
            </Box>
          )}

          {tabValue === 3 && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No draft posts available
              </Typography>
            </Box>
          )}
        </motion.div>
      </Box>
    </Container>
  );
};

export default Posts;
