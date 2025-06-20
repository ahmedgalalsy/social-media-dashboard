# Social Media Dashboard Documentation

## Overview

This document provides detailed information about the Social Media Dashboard application, its architecture, components, and functionality.

## Table of Contents

1. [Architecture](#architecture)
2. [Components](#components)
3. [State Management](#state-management)
4. [API Integration](#api-integration)
5. [Performance Optimizations](#performance-optimizations)
6. [Testing](#testing)
7. [Future Enhancements](#future-enhancements)

## Architecture

The Social Media Dashboard is built using a modern React architecture with the following key elements:

- **Component-Based Structure**: UI is broken down into reusable components
- **Redux State Management**: Centralized state management with Redux Toolkit
- **API Service Layer**: Abstracted API calls for data fetching
- **Performance Utilities**: Custom utilities for optimization

### Directory Structure

```
social-media-dashboard/
├── public/                  # Static files
├── src/                     # Source code
│   ├── api/                 # API service layer
│   │   ├── mockApi.js       # Mock API services
│   │   └── socialMediaApi.js # API service interfaces
│   ├── components/          # Reusable UI components
│   │   ├── EngagementChart.js
│   │   ├── Header.js
│   │   ├── PlatformDistributionChart.js
│   │   ├── RecentPostsTable.js
│   │   ├── SearchBar.js
│   │   ├── Sidebar.js
│   │   └── StatCard.js
│   ├── pages/               # Page components
│   │   └── Dashboard.js
│   ├── redux/               # Redux store and slices
│   │   ├── socialMediaSlice.js
│   │   └── store.js
│   ├── tests/               # Unit tests
│   │   ├── Dashboard.test.js
│   │   ├── EngagementChart.test.js
│   │   ├── PlatformDistributionChart.test.js
│   │   ├── RecentPostsTable.test.js
│   │   └── SearchBar.test.js
│   ├── utils/               # Utility functions
│   │   ├── mockData.js      # Mock data for development
│   │   └── performance.js   # Performance optimization utilities
│   ├── App.js               # Main App component
│   └── index.js             # Entry point
└── package.json             # Project dependencies
```

## Components

### Dashboard

The main container component that integrates all dashboard elements. It fetches data from the Redux store and distributes it to child components.

### Header

Navigation header with application title and main navigation links.

### Sidebar

Side navigation panel with links to different sections of the dashboard.

### StatCard

Displays key metrics for each social media platform with change indicators.

**Props:**
- `platform`: Platform name (e.g., "Facebook")
- `icon`: Platform icon identifier
- `value`: Metric value to display
- `label`: Description of the metric
- `change`: Percentage change (positive or negative)

### EngagementChart

Line chart showing engagement trends over time for different platforms.

**Props:**
- `data`: Historical data array for the chart
- `title`: Chart title (optional)

**Features:**
- Time range selection (7 days, 30 days, 90 days, 1 year)
- Dynamic data loading based on selected time range
- Loading and error states

### PlatformDistributionChart

Pie chart showing audience distribution across different platforms.

**Props:**
- `data`: Platform data object
- `title`: Chart title (optional)

### RecentPostsTable

Table displaying recent posts with engagement metrics and status.

**Props:**
- `data`: Array of post data
- `title`: Table title (optional)

**Features:**
- Sorting by clicking column headers
- Filtering by platform
- Search functionality
- Status indicators with color coding

### SearchBar

Reusable search input component with debounced search.

**Props:**
- `onSearch`: Callback function for search
- `placeholder`: Input placeholder text (optional)

## State Management

The application uses Redux Toolkit for state management with the following structure:

### Store

Central Redux store configured in `store.js` with middleware for async operations.

### Social Media Slice

Main state slice in `socialMediaSlice.js` with:

- **State Structure**:
  - `data`: Social media data including platforms, historical data, and recent posts
  - `loading`: Loading states for different data types
  - `error`: Error states for different operations
  - `filters`: User-selected filters
  - `selectedPlatform`: Currently selected platform
  - `selectedTimeRange`: Selected time range for historical data

- **Actions**:
  - `fetchSocialMediaData`: Fetches all dashboard data
  - `fetchPlatformSpecificData`: Fetches data for a specific platform
  - `fetchHistoricalDataByRange`: Fetches historical data for a specific time range
  - `setFilter`: Updates filter settings
  - `resetFilters`: Resets filters to defaults
  - `setSelectedPlatform`: Updates selected platform
  - `setSelectedTimeRange`: Updates selected time range

## API Integration

The application is designed to work with a backend API but currently uses mock data for demonstration.

### Mock API

Located in `api/mockApi.js`, it simulates network requests with artificial delays:

- `fetchSocialMediaStats()`: Fetches all social media statistics
- `fetchPlatformData(platform)`: Fetches data for a specific platform
- `fetchHistoricalData(timeRange)`: Fetches historical data for a specific time range

### Real API Integration

To connect with a real API:

1. Update the API endpoints in `api/socialMediaApi.js`
2. Modify the async thunks in `redux/socialMediaSlice.js`
3. Adjust data transformation as needed

## Performance Optimizations

Several performance optimization techniques are implemented:

### Memoization

- `useMemo` for expensive calculations and component rendering
- `React.memo` for preventing unnecessary component re-renders

### Debouncing

Search inputs are debounced to reduce state updates and re-renders during typing.

### Throttling

API calls are throttled to prevent excessive requests when changing filters or time ranges.

### Code Splitting

Future enhancement: Implement code splitting for larger bundle size reduction.

## Testing

Unit tests are implemented using Jest and React Testing Library:

- **Component Tests**: Test rendering and user interactions
- **Redux Tests**: Test state changes and async operations
- **Mock Store**: Used for testing components with Redux dependencies

## Future Enhancements

Potential future improvements:

1. **Real-time Updates**: WebSocket integration for live data
2. **Export Functionality**: Export reports as PDF or CSV
3. **Custom Date Ranges**: Allow users to select custom date ranges
4. **User Authentication**: Add login and user-specific dashboards
5. **Dark Mode**: Implement theme switching
6. **Localization**: Add multi-language support
