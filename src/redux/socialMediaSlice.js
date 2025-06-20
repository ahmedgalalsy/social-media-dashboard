import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSocialMediaStats, fetchPlatformData, fetchHistoricalData } from '../api/mockApi';

// Async thunk for fetching all social media data
export const fetchSocialMediaData = createAsyncThunk(
  'socialMedia/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchSocialMediaStats();
      
      if (!response.success) {
        return rejectWithValue(response.error);
      }
      
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch social media data: ' + error.message);
    }
  }
);

// Async thunk for fetching data for a specific platform
export const fetchPlatformSpecificData = createAsyncThunk(
  'socialMedia/fetchPlatformData',
  async (platform, { rejectWithValue }) => {
    try {
      const response = await fetchPlatformData(platform);
      
      if (!response.success) {
        return rejectWithValue(response.error);
      }
      
      return { platform, data: response.data };
    } catch (error) {
      return rejectWithValue(`Failed to fetch ${platform} data: ${error.message}`);
    }
  }
);

// Async thunk for fetching historical data with time range
export const fetchHistoricalDataByRange = createAsyncThunk(
  'socialMedia/fetchHistoricalData',
  async (timeRange = '30days', { rejectWithValue }) => {
    try {
      const response = await fetchHistoricalData(timeRange);
      
      if (!response.success) {
        return rejectWithValue(response.error);
      }
      
      return { data: response.data, timeRange: response.timeRange };
    } catch (error) {
      return rejectWithValue('Failed to fetch historical data: ' + error.message);
    }
  }
);

const initialState = {
  data: {
    platforms: {
      facebook: { followers: 0, engagement: 0, posts: 0, likes: 0, growth: 0, recentPosts: [] },
      twitter: { followers: 0, engagement: 0, tweets: 0, retweets: 0, growth: 0, recentPosts: [] },
      instagram: { followers: 0, engagement: 0, posts: 0, likes: 0, growth: 0, recentPosts: [] },
      linkedin: { followers: 0, engagement: 0, posts: 0, interactions: 0, growth: 0, recentPosts: [] }
    },
    historical: [],
    totalFollowers: 0,
    totalEngagement: 0,
    recentPosts: []
  },
  loading: false,
  platformLoading: false,
  historicalLoading: false,
  error: null,
  platformError: null,
  historicalError: null,
  filters: {
    platform: 'all',
    dateRange: '30days'
  },
  selectedPlatform: null,
  selectedTimeRange: '30days'
};

const socialMediaSlice = createSlice({
  name: 'socialMedia',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSelectedPlatform: (state, action) => {
      state.selectedPlatform = action.payload;
    },
    setSelectedTimeRange: (state, action) => {
      state.selectedTimeRange = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchSocialMediaData
      .addCase(fetchSocialMediaData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSocialMediaData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSocialMediaData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch data';
      })
      
      // Handle fetchPlatformSpecificData
      .addCase(fetchPlatformSpecificData.pending, (state) => {
        state.platformLoading = true;
        state.platformError = null;
      })
      .addCase(fetchPlatformSpecificData.fulfilled, (state, action) => {
        state.platformLoading = false;
        const { platform, data } = action.payload;
        state.data.platforms[platform] = data;
      })
      .addCase(fetchPlatformSpecificData.rejected, (state, action) => {
        state.platformLoading = false;
        state.platformError = action.payload || 'Failed to fetch platform data';
      })
      
      // Handle fetchHistoricalDataByRange
      .addCase(fetchHistoricalDataByRange.pending, (state) => {
        state.historicalLoading = true;
        state.historicalError = null;
      })
      .addCase(fetchHistoricalDataByRange.fulfilled, (state, action) => {
        state.historicalLoading = false;
        state.data.historical = action.payload.data;
        state.selectedTimeRange = action.payload.timeRange;
      })
      .addCase(fetchHistoricalDataByRange.rejected, (state, action) => {
        state.historicalLoading = false;
        state.historicalError = action.payload || 'Failed to fetch historical data';
      });
  }
});

export const { setFilter, resetFilters, setSelectedPlatform, setSelectedTimeRange } = socialMediaSlice.actions;
export default socialMediaSlice.reducer;
