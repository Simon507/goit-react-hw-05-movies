import { Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { lazy } from 'react';

const HomeList = lazy(() => import('./pages/HomeList'));
const Movies = lazy(() => import('./pages/Movies'));
const Movie = lazy(() => import('./pages/Movie'));

const Cast = lazy(() => import('./cast/Cast'));
const Reviews = lazy(() => import('./reviews/Reviews'));

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
