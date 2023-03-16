import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoaderBox } from '../loader/Loader.styles';
import Loader from '../loader/Loader';
import { Toaster } from '../Toaster';
import { nanoid } from 'nanoid';
import { CastList, CastItem } from '../cast/Cast.styles';

export const Cast = () => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [cast, setCast] = useState([]);

  const { movieId } = useParams();
  const mainPhotoPath = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    async function Response() {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=6c2e7884d8582c075e4f6889ea94f7ad&language=en-US`
        )
        .then(obj => {
          setCast(obj.data.cast);
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
      <CastList>
        {cast.length === 0 ? (
          <h3>Sorry. There is no information about the cast...</h3>
        ) : (
          cast.map(item => (
            <CastItem key={nanoid(8)}>
              {item.profile_path ? (
                <img src={`${mainPhotoPath}${item.profile_path}`} alt="" />
              ) : (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2b/No-Photo-Available-240x300.jpg"
                  alt=""
                />
              )}

              <p>{item.original_name}</p>
            </CastItem>
          ))
        )}
      </CastList>
      {errorMessage && <Toaster message={errorMessage} />}
    </>
  );
};
