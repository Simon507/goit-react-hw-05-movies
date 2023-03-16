import styled from 'styled-components';
import { Link as MovieLink } from 'react-router-dom';

export const StyledLink = styled(MovieLink)`
  color: #270b97;
  text-decoration: none;
  height: 100%;
`;

export const MainSection = styled.section`
  padding: 15px;
  box-shadow: 6px 0px 6px 0px rgba(0, 0, 0, 0.75);
  border-left: 1px solid gray;
  border-top: 1px solid gray;
`;

export const FilmList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const FilmCard = styled.div`
  padding: 10px;
  box-shadow: 6px 0px 6px 0px rgba(0, 0, 0, 0.75);
  border-left: 1px solid gray;
  border-top: 1px solid gray;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
`;

export const FilmImg = styled.img`
  height: 100%;
`;
