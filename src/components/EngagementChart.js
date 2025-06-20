import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchHistoricalDataByRange, setSelectedTimeRange } from '../redux/socialMediaSlice';
import { throttle } from '../utils/performance';

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

const ChartControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SelectControl = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
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

const EngagementChart = ({ data = [], title = "Social Media Engagement Over Time" }) => {
  const dispatch = useDispatch();
  const { selectedTimeRange, historicalLoading, historicalError, data: reduxData } = useSelector((state) => state.socialMedia);
  
  // Use data from Redux store if available, otherwise use props data
  const chartData = useMemo(() => {
    return reduxData?.historical?.length > 0 ? reduxData.historical : data;
  }, [reduxData?.historical, data]);
  
  useEffect(() => {
    // Fetch historical data when component mounts or time range changes
    dispatch(fetchHistoricalDataByRange(selectedTimeRange));
  }, [dispatch, selectedTimeRange]);

  // Throttle the time range change to prevent excessive API calls
  const handleTimeRangeChange = useCallback(
    throttle((newTimeRange) => {
      dispatch(setSelectedTimeRange(newTimeRange));
      dispatch(fetchHistoricalDataByRange(newTimeRange));
    }, 500),
    [dispatch]
  );

  const onSelectChange = (e) => {
    const newTimeRange = e.target.value;
    handleTimeRangeChange(newTimeRange);
  };

  // Memoize the chart component to prevent unnecessary re-renders
  const chartComponent = useMemo(() => {
    if (historicalLoading) {
      return (
        <LoadingOverlay>
          Loading chart data...
        </LoadingOverlay>
      );
    }
    
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="facebook" stroke="#3b5998" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="twitter" stroke="#1da1f2" />
          <Line type="monotone" dataKey="instagram" stroke="#c32aa3" />
          <Line type="monotone" dataKey="linkedin" stroke="#0077b5" />
        </LineChart>
      </ResponsiveContainer>
    );
  }, [chartData, historicalLoading]);

  return (
    <ChartContainer>
      <ChartTitle>{title}</ChartTitle>
      <ChartControls>
        <SelectControl value={selectedTimeRange} onChange={onSelectChange}>
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="90days">Last 90 days</option>
          <option value="1year">Last year</option>
        </SelectControl>
      </ChartControls>
      
      {historicalError && (
        <ErrorMessage>
          Error loading chart data: {historicalError}
        </ErrorMessage>
      )}
      
      {chartComponent}
    </ChartContainer>
  );
};

export default React.memo(EngagementChart);
