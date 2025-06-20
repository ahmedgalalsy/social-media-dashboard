import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';

const PieChart = ({ data, title }) => {
  const theme = useTheme();

  // Define colors for pie chart segments
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.info.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#8dd1e1',
  ];

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
        <RechartsPieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            animationDuration={1000}
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 4,
              boxShadow: theme.shadows[3]
            }}
            formatter={(value) => [`${value}`, 'Value']}
          />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PieChart;
