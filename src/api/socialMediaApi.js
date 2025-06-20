import React from 'react';
import axios from 'axios';

// API service for social media data
const API_URL = 'https://mocki.io/v1/d4d63595-a35e-4e7c-8256-4f2d5e1e2d93';

// Get all social media data
export const getSocialMediaData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching social media data:', error);
    throw error;
  }
};

// Get data for a specific platform
export const getPlatformData = async (platform) => {
  try {
    const response = await axios.get(API_URL);
    return response.data[platform] || null;
  } catch (error) {
    console.error(`Error fetching ${platform} data:`, error);
    throw error;
  }
};

// Mock function to simulate posting data
export const updateSocialMediaData = async (data) => {
  try {
    // In a real app, this would be a POST or PUT request
    console.log('Updating data:', data);
    return { success: true, message: 'Data updated successfully' };
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};
