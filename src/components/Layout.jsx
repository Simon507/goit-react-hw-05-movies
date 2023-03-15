import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  font-size: 25px;
  margin-right: 25px;

  &&:hover,
  &&:focus {
    color: rgb(64, 136, 207);
  }

  &.active {
    color: rgb(60, 0, 255);
  }
`;

const NavigationBar = styled.nav`
  padding: 15px;
  box-shadow: 6px 0px 6px 0px rgba(0, 0, 0, 0.75);
  border-left: 1px solid gray;
  border-top: 1px solid gray;
`;

export const Layout = () => {
  return (
    <header>
      <NavigationBar>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
      </NavigationBar>
      <main>
        <Outlet />
      </main>
    </header>
  );
};
