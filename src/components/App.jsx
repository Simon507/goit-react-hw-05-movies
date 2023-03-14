import { Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyle';
import { HomeList } from './pages/HomeList';
import { Cast } from './cast/Cast';
import { Reviews } from './reviews/Reviews';
import Movies from './pages/Movies';

import { Layout } from './Layout';
import Movie from './pages/Movie';

export const App = () => {
  return (
    <>
      <GlobalStyle />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeList />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<Movie />}>
            <Route path="cast" element={<Cast />}></Route>
            <Route path="reviews" element={<Reviews />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};
