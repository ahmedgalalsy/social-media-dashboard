import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>Social Media Dashboard</Logo>
      <Navigation>
        <NavLink href="#">Dashboard</NavLink>
        <NavLink href="#">Analytics</NavLink>
        <NavLink href="#">Reports</NavLink>
        <NavLink href="#">Settings</NavLink>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;
