import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EngagementChart from '../components/EngagementChart';

// Create mock store
const mockStore = configureStore([]);

describe('EngagementChart Component', () => {
  let store;
  const initialState = {
    socialMedia: {
      selectedTimeRange: '30days',
      historicalLoading: false,
      historicalError: null,
      data: {
        historical: [
          { name: 'Jan', facebook: 4000, twitter: 2400, instagram: 2400, linkedin: 1200 },
          { name: 'Feb', facebook: 3000, twitter: 1398, instagram: 2800, linkedin: 1300 },
          { name: 'Mar', facebook: 2000, twitter: 9800, instagram: 3200, linkedin: 1400 }
        ]
      }
    }
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders chart with title', () => {
    render(
      <Provider store={store}>
        <EngagementChart />
      </Provider>
    );
    
    expect(screen.getByText('Social Media Engagement Over Time')).toBeInTheDocument();
  });

  test('renders chart with custom title', () => {
    render(
      <Provider store={store}>
        <EngagementChart title="Custom Chart Title" />
      </Provider>
    );
    
    expect(screen.getByText('Custom Chart Title')).toBeInTheDocument();
  });

  test('renders time range selector', () => {
    render(
      <Provider store={store}>
        <EngagementChart />
      </Provider>
    );
    
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Last 7 days')).toBeInTheDocument();
    expect(screen.getByText('Last 30 days')).toBeInTheDocument();
    expect(screen.getByText('Last 90 days')).toBeInTheDocument();
    expect(screen.getByText('Last year')).toBeInTheDocument();
  });

  test('shows loading state when loading', () => {
    const loadingState = {
      socialMedia: {
        ...initialState.socialMedia,
        historicalLoading: true
      }
    };
    const loadingStore = mockStore(loadingState);
    
    render(
      <Provider store={loadingStore}>
        <EngagementChart />
      </Provider>
    );
    
    expect(screen.getByText('Loading chart data...')).toBeInTheDocument();
  });

  test('shows error message when there is an error', () => {
    const errorState = {
      socialMedia: {
        ...initialState.socialMedia,
        historicalError: 'Failed to load data'
      }
    };
    const errorStore = mockStore(errorState);
    
    render(
      <Provider store={errorStore}>
        <EngagementChart />
      </Provider>
    );
    
    expect(screen.getByText('Error loading chart data: Failed to load data')).toBeInTheDocument();
  });
});
