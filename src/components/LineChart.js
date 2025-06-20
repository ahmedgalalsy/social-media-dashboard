import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';

const LineChart = ({ data, title }) => {
  const theme = useTheme();

  // Ensure data is in the correct format
  const formattedData = React.useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data.map(item => ({
      name: item.name,
      value: item.value
    }));
  }, [data]);

  if (!formattedData.length) {
    return (
      <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="body1" color="text.secondary">No data available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {title && <Typography variant="h6" gutterBottom>{title}</Typography>}
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart
          data={formattedData}
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
          <Tooltip 
            contentStyle={{ 
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 4,
              boxShadow: theme.shadows[3]
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={theme.palette.primary.main} 
            activeDot={{ r: 8 }}
            name="Value"
            strokeWidth={2}
            dot={{ stroke: theme.palette.primary.main, strokeWidth: 2, r: 4, fill: 'white' }}
            animationDuration={1000}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineChart;
