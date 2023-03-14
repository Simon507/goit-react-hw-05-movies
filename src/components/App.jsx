import { NavLink, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyle';
import { HomeList } from './pages/HomeList';
import Movies from './pages/Movies';

import { Layout } from './Layout';

export const App = () => {
  return (
    <Layout>
      <GlobalStyle />
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<HomeList />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/movies/:movieId" element={<div>MOVIE ID</div>}></Route>
      </Routes>
    </Layout>
  );
};
