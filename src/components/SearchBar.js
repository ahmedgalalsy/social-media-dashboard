import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { debounce } from '../utils/performance';

const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #95a5a6;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Debounce the search to avoid excessive updates
  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 300),
    [onSearch]
  );
  
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };
  
  return (
    <SearchContainer>
      <InputWrapper>
        <SearchInput 
          type="text" 
          placeholder={placeholder} 
          value={searchTerm}
          onChange={handleChange}
        />
        <SearchIcon>🔍</SearchIcon>
      </InputWrapper>
    </SearchContainer>
  );
};

export default React.memo(SearchBar);
