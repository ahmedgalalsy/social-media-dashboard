import { getMockData } from '../utils/mockData';

// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service with artificial delay to simulate network requests
export const fetchSocialMediaStats = async () => {
  try {
    // Simulate network delay
    await delay(800);
    
    // Get mock data
    const data = getMockData();
    
    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Error fetching social media stats:', error);
    return {
      success: false,
      error: 'Failed to fetch social media statistics'
    };
  }
};

export const fetchPlatformData = async (platform) => {
  try {
    // Simulate network delay
    await delay(600);
    
    // Get mock data for specific platform
    const data = getMockData();
    
    if (!data.platforms[platform]) {
      throw new Error(`Platform ${platform} not found`);
    }
    
    return {
      success: true,
      data: data.platforms[platform]
    };
  } catch (error) {
    console.error(`Error fetching ${platform} data:`, error);
    return {
      success: false,
      error: `Failed to fetch ${platform} data: ${error.message}`
    };
  }
};

export const fetchHistoricalData = async (timeRange = '30days') => {
  try {
    // Simulate network delay
    await delay(700);
    
    // Get mock historical data
    const data = getMockData();
    
    // In a real app, we would filter based on timeRange
    // For now, just return all historical data
    
    return {
      success: true,
      data: data.historical,
      timeRange
    };
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return {
      success: false,
      error: 'Failed to fetch historical data'
    };
  }
};
