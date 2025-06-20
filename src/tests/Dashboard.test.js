import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Dashboard from '../pages/Dashboard';

// Mock the components used in Dashboard
jest.mock('../components/Header', () => () => <div data-testid="mock-header">Header</div>);
jest.mock('../components/Sidebar', () => () => <div data-testid="mock-sidebar">Sidebar</div>);
jest.mock('../components/StatCard', () => ({ platform }) => <div data-testid={`mock-stat-card-${platform.toLowerCase()}`}>{platform} Stats</div>);
jest.mock('../components/EngagementChart', () => () => <div data-testid="mock-engagement-chart">Engagement Chart</div>);
jest.mock('../components/PlatformDistributionChart', () => () => <div data-testid="mock-distribution-chart">Distribution Chart</div>);
jest.mock('../components/RecentPostsTable', () => () => <div data-testid="mock-posts-table">Recent Posts</div>);

// Create mock store
const mockStore = configureStore([]);

describe('Dashboard Component', () => {
  let store;
  const initialState = {
    socialMedia: {
      loading: false,
      error: null,
      data: {
        platforms: {
          facebook: { followers: 12500, growth: 2.5 },
          twitter: { followers: 8750, growth: 1.2 },
          instagram: { followers: 15200, growth: 3.8 },
          linkedin: { followers: 5400, growth: -0.5 }
        },
        historical: [],
        recentPosts: []
      }
    }
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders dashboard with all components', () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    
    // Check if all components are rendered
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-stat-card-facebook')).toBeInTheDocument();
    expect(screen.getByTestId('mock-stat-card-twitter')).toBeInTheDocument();
    expect(screen.getByTestId('mock-stat-card-instagram')).toBeInTheDocument();
    expect(screen.getByTestId('mock-stat-card-linkedin')).toBeInTheDocument();
    expect(screen.getByTestId('mock-engagement-chart')).toBeInTheDocument();
    expect(screen.getByTestId('mock-distribution-chart')).toBeInTheDocument();
    expect(screen.getByTestId('mock-posts-table')).toBeInTheDocument();
  });

  test('shows loading state when loading', () => {
    const loadingState = {
      socialMedia: {
        ...initialState.socialMedia,
        loading: true
      }
    };
    const loadingStore = mockStore(loadingState);
    
    render(
      <Provider store={loadingStore}>
        <Dashboard />
      </Provider>
    );
    
    expect(screen.getByText('Loading dashboard data...')).toBeInTheDocument();
  });

  test('shows error message when there is an error', () => {
    const errorState = {
      socialMedia: {
        ...initialState.socialMedia,
        error: 'Failed to load dashboard data'
      }
    };
    const errorStore = mockStore(errorState);
    
    render(
      <Provider store={errorStore}>
        <Dashboard />
      </Provider>
    );
    
    expect(screen.getByText('Error loading dashboard data: Failed to load dashboard data')).toBeInTheDocument();
  });
});
