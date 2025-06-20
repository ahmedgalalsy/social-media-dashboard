import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PlatformDistributionChart from '../components/PlatformDistributionChart';

// Create mock store
const mockStore = configureStore([]);

describe('PlatformDistributionChart Component', () => {
  let store;
  const initialState = {
    socialMedia: {
      loading: false,
      error: null,
      data: {
        platforms: {
          facebook: { followers: 12500 },
          twitter: { followers: 8750 },
          instagram: { followers: 15200 },
          linkedin: { followers: 5400 }
        }
      }
    }
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders chart with title', () => {
    render(
      <Provider store={store}>
        <PlatformDistributionChart />
      </Provider>
    );
    
    expect(screen.getByText('Audience Distribution by Platform')).toBeInTheDocument();
  });

  test('renders chart with custom title', () => {
    render(
      <Provider store={store}>
        <PlatformDistributionChart title="Custom Chart Title" />
      </Provider>
    );
    
    expect(screen.getByText('Custom Chart Title')).toBeInTheDocument();
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
        <PlatformDistributionChart />
      </Provider>
    );
    
    expect(screen.getByText('Loading chart data...')).toBeInTheDocument();
  });

  test('shows error message when there is an error', () => {
    const errorState = {
      socialMedia: {
        ...initialState.socialMedia,
        error: 'Failed to load data'
      }
    };
    const errorStore = mockStore(errorState);
    
    render(
      <Provider store={errorStore}>
        <PlatformDistributionChart />
      </Provider>
    );
    
    expect(screen.getByText('Error loading chart data: Failed to load data')).toBeInTheDocument();
  });
});
