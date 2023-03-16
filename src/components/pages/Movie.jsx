import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoaderBox } from '../loader/Loader.styles';
import Loader from '../loader/Loader';
import { Toaster } from '../Toaster';
import { Outlet, useParams, useLocation } from 'react-router-dom';

import { BackLink } from '../backLink/BackLink';
import {
  StyledLink,
  MainSection,
  AdditionalSection,
  Poster,
  MainTxtBlock,
  AdditionalUl,
} from '../pages/Movie.styles';

const Movie = () => {
  const [targetMovie, setTargetMovie] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { movieId } = useParams();

  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  const mainPhotoPath = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    setLoading(true);

    async function Response() {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=6c2e7884d8582c075e4f6889ea94f7ad&language=en-US`
        )
        .then(obj => {
          setTargetMovie(obj.data);

          console.log(obj.data);
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

      <MainSection>
        {targetMovie.poster_path ? (
          <Poster
            src={`${mainPhotoPath}${targetMovie.poster_path}`}
            alt={targetMovie.original_title}
          />
        ) : (
          <Poster
            src="https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png"
            alt={targetMovie.original_title}
          />
        )}

        <MainTxtBlock>
          {targetMovie.original_title && (
            <h2>
              {targetMovie.original_title} (
              {targetMovie.release_date.substr(0, 4)})
            </h2>
          )}
          <p>User Score: {targetMovie.vote_average}</p>
          <h4>Overview</h4>
          <p>{targetMovie.overview}</p>
          <h5>Genres</h5>
          <ul>
            {targetMovie.genres &&
              targetMovie.genres.map(item => <p key={item.id}>{item.name}</p>)}
          </ul>
        </MainTxtBlock>
      </MainSection>

      <AdditionalSection>
        <AdditionalUl>
          <StyledLink to={'cast'} state={{ from: backLinkHref }}>
            Cast
          </StyledLink>
          <StyledLink to={'reviews'} state={{ from: backLinkHref }}>
            Reviews
          </StyledLink>
        </AdditionalUl>
        <Outlet />
      </AdditionalSection>

      {errorMessage && <Toaster message={errorMessage} />}
    </>
  );
};

export default Movie;
