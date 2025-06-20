// Mock data for social media analytics
const mockData = {
  facebook: {
    followers: 12500,
    engagement: 3.2,
    posts: 45,
    likes: 8750,
    growth: 2.5,
    recentPosts: [
      { id: 1, content: 'New product launch announcement', engagement: 1245, status: 'high', date: '2023-04-10' },
      { id: 2, content: 'Customer testimonial', engagement: 321, status: 'medium', date: '2023-04-06' },
    ]
  },
  twitter: {
    followers: 8750,
    engagement: 2.8,
    tweets: 78,
    retweets: 1200,
    growth: 1.2,
    recentPosts: [
      { id: 1, content: 'Industry news retweet', engagement: 567, status: 'medium', date: '2023-04-09' },
      { id: 2, content: 'Company update', engagement: 289, status: 'low', date: '2023-04-05' },
    ]
  },
  instagram: {
    followers: 15200,
    engagement: 4.5,
    posts: 32,
    likes: 9800,
    growth: 3.8,
    recentPosts: [
      { id: 1, content: 'Behind the scenes photo', engagement: 890, status: 'high', date: '2023-04-08' },
      { id: 2, content: 'Product showcase', engagement: 756, status: 'high', date: '2023-04-04' },
    ]
  },
  linkedin: {
    followers: 5400,
    engagement: 1.9,
    posts: 28,
    interactions: 620,
    growth: -0.5,
    recentPosts: [
      { id: 1, content: 'Company milestone celebration', engagement: 432, status: 'low', date: '2023-04-07' },
      { id: 2, content: 'Industry insights article', engagement: 387, status: 'medium', date: '2023-04-03' },
    ]
  }
};

// Historical data for charts
const historicalData = [
  { name: 'Jan', facebook: 4000, twitter: 2400, instagram: 2400, linkedin: 1200 },
  { name: 'Feb', facebook: 3000, twitter: 1398, instagram: 2800, linkedin: 1300 },
  { name: 'Mar', facebook: 2000, twitter: 9800, instagram: 3200, linkedin: 1400 },
  { name: 'Apr', facebook: 2780, twitter: 3908, instagram: 3600, linkedin: 1500 },
  { name: 'May', facebook: 1890, twitter: 4800, instagram: 4000, linkedin: 1700 },
  { name: 'Jun', facebook: 2390, twitter: 3800, instagram: 4300, linkedin: 1900 },
  { name: 'Jul', facebook: 3490, twitter: 4300, instagram: 4800, linkedin: 2100 },
];

// Export the mock data
export const getMockData = () => {
  return {
    platforms: mockData,
    historical: historicalData,
    totalFollowers: Object.values(mockData).reduce((sum, platform) => sum + platform.followers, 0),
    totalEngagement: Object.values(mockData).reduce((sum, platform) => sum + platform.engagement, 0) / 4, // Average
    recentPosts: [
      ...mockData.facebook.recentPosts.map(post => ({ ...post, platform: 'Facebook' })),
      ...mockData.twitter.recentPosts.map(post => ({ ...post, platform: 'Twitter' })),
      ...mockData.instagram.recentPosts.map(post => ({ ...post, platform: 'Instagram' })),
      ...mockData.linkedin.recentPosts.map(post => ({ ...post, platform: 'LinkedIn' })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date))
  };
};

export default getMockData;
