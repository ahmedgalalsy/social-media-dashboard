import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';

const BarChart = ({ data, title }) => {
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
        <RechartsBarChart
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
          <Bar 
            dataKey="value" 
            fill={theme.palette.primary.main} 
            name="Value"
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarChart;
