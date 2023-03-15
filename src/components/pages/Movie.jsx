import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoaderBox } from '../loader/Loader.styles';
import Loader from '../loader/Loader';
import { Toaster } from '../Toaster';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BackLink } from '../backLink/BackLink';

const Movie = () => {
  const [targetMovie, setTargetMovie] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { movieId } = useParams();

  const location = useLocation();
  console.log(location);
  const backLinkHref = location.state?.from ?? '/';
  console.log(location.state?.pathname);

  useEffect(() => {
    setLoading(true);

    async function Response() {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=6c2e7884d8582c075e4f6889ea94f7ad&language=en-US`
        )
        .then(obj => {
          setTargetMovie(obj.data);
        })
        .catch(error => {
          setErrorMessage(error);
        })
        .finally(setLoading(false));
    }
    Response();
  }, [movieId]);

  return (
    <>
      {isLoading && (
        <LoaderBox>
          <Loader />
        </LoaderBox>
      )}
      <BackLink to={backLinkHref}>Go back</BackLink>
      {targetMovie.original_title && <h2>{targetMovie.original_title}</h2>}

      <ul>
        <Link to={'cast'}>111111</Link>
        <Link to={'reviews'}>222222</Link>
      </ul>
      <Outlet />
      {errorMessage && <Toaster message={errorMessage} />}
    </>
  );
};

export default Movie;
