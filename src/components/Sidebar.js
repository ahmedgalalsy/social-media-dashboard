import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  background-color: #34495e;
  color: white;
  width: 250px;
  height: 100vh;
  padding: 1rem 0;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const SidebarHeader = styled.div`
  padding: 0 1.5rem 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SidebarTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  padding: 1rem 0;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    border-left: 4px solid #3498db;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarTitle>Social Media Dashboard</SidebarTitle>
      </SidebarHeader>
      <SidebarMenu>
        <MenuItem className="active">
          <span>Dashboard</span>
        </MenuItem>
        <MenuItem>
          <span>Facebook</span>
        </MenuItem>
        <MenuItem>
          <span>Twitter</span>
        </MenuItem>
        <MenuItem>
          <span>Instagram</span>
        </MenuItem>
        <MenuItem>
          <span>LinkedIn</span>
        </MenuItem>
        <MenuItem>
          <span>Analytics</span>
        </MenuItem>
        <MenuItem>
          <span>Reports</span>
        </MenuItem>
        <MenuItem>
          <span>Settings</span>
        </MenuItem>
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
