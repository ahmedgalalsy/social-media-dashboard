import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchSocialMediaData, setFilter } from '../redux/socialMediaSlice';
import SearchBar from './SearchBar';

const TableContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  overflow-x: auto;
`;

const TableTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #2c3e50;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f8f9fa;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #e9ecef;
  color: #495057;
  cursor: pointer;
  position: relative;
  
  &:hover {
    background-color: #e9ecef;
  }
  
  &::after {
    content: '${props => props.sorted === 'asc' ? ' ↑' : props.sorted === 'desc' ? ' ↓' : ''}';
    position: absolute;
    right: 8px;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  background-color: ${props => {
    switch (props.status) {
      case 'high':
        return '#e74c3c';
      case 'medium':
        return '#f39c12';
      case 'low':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  }};
  color: white;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
`;

const LoadingOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1rem;
  color: #3498db;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  min-width: 150px;
`;

const RecentPostsTable = ({ data = [], title = "Recent Posts Performance" }) => {
  const dispatch = useDispatch();
  const { loading, error, data: reduxData, filters } = useSelector((state) => state.socialMedia);
  
  // Use data from Redux store if available, otherwise use props data
  const tableData = reduxData?.recentPosts?.length > 0 ? reduxData.recentPosts : data;
  
  // State for sorting and searching
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // If we don't have posts data yet, fetch it
    if (!reduxData.recentPosts || reduxData.recentPosts.length === 0) {
      dispatch(fetchSocialMediaData());
    }
  }, [dispatch, reduxData.recentPosts]);

  const handlePlatformFilterChange = (e) => {
    dispatch(setFilter({ platform: e.target.value }));
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter posts based on selected platform and search term
  let filteredData = filters.platform === 'all' 
    ? tableData 
    : tableData.filter(post => post.platform.toLowerCase() === filters.platform.toLowerCase());
  
  // Apply search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredData = filteredData.filter(post => 
      (post.content || post.post)?.toLowerCase().includes(term) || 
      post.platform.toLowerCase().includes(term)
    );
  }
  
  // Apply sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key === 'engagement') {
      return sortConfig.direction === 'asc' 
        ? a.engagement - b.engagement
        : b.engagement - a.engagement;
    } else if (sortConfig.key === 'date') {
      return sortConfig.direction === 'asc'
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    } else {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  });

  return (
    <TableContainer>
      <TableTitle>{title}</TableTitle>
      
      <FilterContainer>
        <FilterSelect value={filters.platform} onChange={handlePlatformFilterChange}>
          <option value="all">All Platforms</option>
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
          <option value="instagram">Instagram</option>
          <option value="linkedin">LinkedIn</option>
        </FilterSelect>
        <SearchBar onSearch={handleSearch} placeholder="Search posts..." />
      </FilterContainer>
      
      {error && (
        <ErrorMessage>
          Error loading posts data: {error}
        </ErrorMessage>
      )}
      
      {loading ? (
        <LoadingOverlay>
          Loading posts data...
        </LoadingOverlay>
      ) : (
        <StyledTable>
          <TableHeader>
            <tr>
              <TableHeaderCell 
                onClick={() => handleSort('platform')}
                sorted={sortConfig.key === 'platform' ? sortConfig.direction : null}
              >
                Platform
              </TableHeaderCell>
              <TableHeaderCell 
                onClick={() => handleSort('content')}
                sorted={sortConfig.key === 'content' ? sortConfig.direction : null}
              >
                Post
              </TableHeaderCell>
              <TableHeaderCell 
                onClick={() => handleSort('engagement')}
                sorted={sortConfig.key === 'engagement' ? sortConfig.direction : null}
              >
                Engagement
              </TableHeaderCell>
              <TableHeaderCell 
                onClick={() => handleSort('status')}
                sorted={sortConfig.key === 'status' ? sortConfig.direction : null}
              >
                Status
              </TableHeaderCell>
              <TableHeaderCell 
                onClick={() => handleSort('date')}
                sorted={sortConfig.key === 'date' ? sortConfig.direction : null}
              >
                Date
              </TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((row, index) => (
                <TableRow key={row.id || index}>
                  <TableCell>{row.platform}</TableCell>
                  <TableCell>{row.content || row.post}</TableCell>
                  <TableCell>{row.engagement.toLocaleString()}</TableCell>
                  <TableCell>
                    <StatusBadge status={row.status}>
                      {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <EmptyState>No posts data available for the selected filter</EmptyState>
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </StyledTable>
      )}
    </TableContainer>
  );
};

export default RecentPostsTable;
