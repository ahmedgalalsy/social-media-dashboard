import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders with default placeholder', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  test('renders with custom placeholder', () => {
    render(<SearchBar onSearch={mockOnSearch} placeholder="Custom placeholder" />);
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
  });

  test('calls onSearch when input changes', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search...');
    
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockOnSearch).toHaveBeenCalledWith('test');
    
    fireEvent.change(input, { target: { value: 'test search' } });
    expect(mockOnSearch).toHaveBeenCalledWith('test search');
  });
});
