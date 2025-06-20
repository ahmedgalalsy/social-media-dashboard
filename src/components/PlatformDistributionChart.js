import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { fetchSocialMediaData } from '../redux/socialMediaSlice';

const ChartContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const ChartTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #2c3e50;
`;

const LoadingOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
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

const COLORS = ['#3b5998', '#1da1f2', '#c32aa3', '#0077b5'];

const PlatformDistributionChart = ({ data = {}, title = "Audience Distribution by Platform" }) => {
  const dispatch = useDispatch();
  const { loading, error, data: reduxData } = useSelector((state) => state.socialMedia);
  
  // Use data from Redux store if available, otherwise use props data
  const platformsData = reduxData?.platforms || data;
  
  useEffect(() => {
    // If we don't have platform data yet, fetch it
    if (!reduxData.platforms || Object.keys(reduxData.platforms).length === 0) {
      dispatch(fetchSocialMediaData());
    }
  }, [dispatch, reduxData.platforms]);

  // Transform the platforms data into the format needed for the pie chart
  const chartData = platformsData ? [
    { name: 'Facebook', value: platformsData.facebook?.followers || 0, color: '#3b5998' },
    { name: 'Twitter', value: platformsData.twitter?.followers || 0, color: '#1da1f2' },
    { name: 'Instagram', value: platformsData.instagram?.followers || 0, color: '#c32aa3' },
    { name: 'LinkedIn', value: platformsData.linkedin?.followers || 0, color: '#0077b5' },
  ] : [];

  return (
    <ChartContainer>
      <ChartTitle>{title}</ChartTitle>
      
      {error && (
        <ErrorMessage>
          Error loading chart data: {error}
        </ErrorMessage>
      )}
      
      {loading ? (
        <LoadingOverlay>
          Loading chart data...
        </LoadingOverlay>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

export default PlatformDistributionChart;
