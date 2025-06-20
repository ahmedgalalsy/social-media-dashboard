import React from 'react';
import styled from 'styled-components';

const StatCardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const PlatformIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlatformName = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: #7f8c8d;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #7f8c8d;
`;

const ChangeIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.isPositive ? '#27ae60' : '#e74c3c'};
`;

const StatCard = ({ platform, icon, value, label, change }) => {
  const isPositive = change >= 0;
  
  return (
    <StatCardContainer>
      <CardHeader>
        <PlatformIcon>{icon}</PlatformIcon>
        <PlatformName>{platform}</PlatformName>
      </CardHeader>
      <StatValue>{value.toLocaleString()}</StatValue>
      <StatLabel>{label}</StatLabel>
      <ChangeIndicator isPositive={isPositive}>
        {isPositive ? '↑' : '↓'} {Math.abs(change)}% since last week
      </ChangeIndicator>
    </StatCardContainer>
  );
};

export default StatCard;
