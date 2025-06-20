import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button, Grid, Chip, IconButton, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { motion } from 'framer-motion';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TimelineIcon from '@mui/icons-material/Timeline';

const AnalyticsFilter = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [platform, setPlatform] = React.useState('all');
  const [dateRange, setDateRange] = React.useState('30days');
  const [chartType, setChartType] = React.useState('bar');
  const [filters, setFilters] = React.useState([]);

  const handlePlatformChange = (event) => {
    setPlatform(event.target.value);
  };

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  const handleChartTypeChange = (event, newChartType) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  const handleAddFilter = () => {
    if (platform !== 'all') {
      const newFilter = `Platform: ${platform}`;
      if (!filters.includes(newFilter)) {
        setFilters([...filters, newFilter]);
      }
    }
  };

  const handleRemoveFilter = (filterToRemove) => {
    setFilters(filters.filter(filter => filter !== filterToRemove));
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ 
        p: 2, 
        mb: 3, 
        mt: 2, 
        borderRadius: 2, 
        bgcolor: 'background.paper',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: expanded ? 2 : 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FilterListIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Box component="span" sx={{ fontWeight: 'medium' }}>Analytics Filters</Box>
          </Box>
          <Button 
            variant="text" 
            color="primary" 
            onClick={toggleExpanded}
            size="small"
          >
            {expanded ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </Box>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel id="platform-select-label">Platform</InputLabel>
                  <Select
                    labelId="platform-select-label"
                    id="platform-select"
                    value={platform}
                    label="Platform"
                    onChange={handlePlatformChange}
                  >
                    <MenuItem value="all">All Platforms</MenuItem>
                    <MenuItem value="facebook">Facebook</MenuItem>
                    <MenuItem value="twitter">Twitter</MenuItem>
                    <MenuItem value="instagram">Instagram</MenuItem>
                    <MenuItem value="linkedin">LinkedIn</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel id="date-range-select-label">Date Range</InputLabel>
                  <Select
                    labelId="date-range-select-label"
                    id="date-range-select"
                    value={dateRange}
                    label="Date Range"
                    onChange={handleDateRangeChange}
                  >
                    <MenuItem value="7days">Last 7 Days</MenuItem>
                    <MenuItem value="30days">Last 30 Days</MenuItem>
                    <MenuItem value="90days">Last 90 Days</MenuItem>
                    <MenuItem value="1year">Last Year</MenuItem>
                    <MenuItem value="custom">Custom Range</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                  <ToggleButtonGroup
                    value={chartType}
                    exclusive
                    onChange={handleChartTypeChange}
                    aria-label="chart type"
                    size="small"
                  >
                    <ToggleButton value="bar" aria-label="bar chart">
                      <BarChartIcon />
                    </ToggleButton>
                    <ToggleButton value="line" aria-label="line chart">
                      <TimelineIcon />
                    </ToggleButton>
                    <ToggleButton value="pie" aria-label="pie chart">
                      <PieChartIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  onClick={handleAddFilter}
                >
                  Apply Filters
                </Button>
              </Grid>
            </Grid>

            {filters.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {filters.map((filter, index) => (
                  <Chip
                    key={index}
                    label={filter}
                    onDelete={() => handleRemoveFilter(filter)}
                    color="primary"
                    variant="outlined"
                    deleteIcon={<CloseIcon />}
                  />
                ))}
                {filters.length > 0 && (
                  <Chip
                    label="Clear All"
                    onClick={() => setFilters([])}
                    color="secondary"
                    variant="outlined"
                  />
                )}
              </Box>
            )}
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
};

export default AnalyticsFilter;
