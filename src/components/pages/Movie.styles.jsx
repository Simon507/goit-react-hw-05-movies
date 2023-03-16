import styled from 'styled-components';
import { Link as RouteLink } from 'react-router-dom';

export const StyledLink = styled(RouteLink)`
  color: black;
  text-decoration: none;
  font-size: 25px;
  margin-right: 25px;
  margin-bottom: 15px;

  &&:hover,
  &&:focus {
    color: rgb(64, 136, 207);
  }

  &.active {
    color: rgb(60, 0, 255);
  }
`;

export const MainSection = styled.section`
  padding: 15px;
  box-shadow: 6px 0px 6px 0px rgba(0, 0, 0, 0.75);
  border-left: 1px solid gray;
  border-top: 1px solid gray;
  display: flex;
  gap: 50px;
`;

export const Poster = styled.img`
  width: 300px;
  height: 450px;
  box-shadow: 6px 0px 6px 0px rgba(0, 0, 0, 0.75);
  border-left: 1px solid gray;
  border-top: 1px solid gray;
`;

export const MainTxtBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;

export const AdditionalSection = styled.section`
  padding: 15px;
  box-shadow: 6px 0px 6px 0px rgba(0, 0, 0, 0.75);
  border-left: 1px solid gray;
  border-top: 1px solid gray;
`;

export const AdditionalUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  font-size: 18 px;
`;
