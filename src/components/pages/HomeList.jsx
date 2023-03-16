import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoaderBox } from '../loader/Loader.styles';
import {
  MainSection,
  FilmList,
  StyledLink,
  FilmCard,
  FilmImg,
} from '../pages/HomeList.styles';
import Loader from '../loader/Loader';
import { Toaster } from '../Toaster';

const HomeList = () => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [bestList, setBestList] = useState([]);

  const mainPhotoPath = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    setLoading(true);

    async function Response() {
      await axios
        .get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=6c2e7884d8582c075e4f6889ea94f7ad`
        )
        .then(obj => {
          setBestList(obj.data.results);
        })
        .catch(error => {
          setErrorMessage(error);
        })
        .finally(setLoading(false));
    }
    Response();
  }, []);

  return (
    <MainSection>
      {isLoading && (
        <LoaderBox>
          <Loader />
        </LoaderBox>
      )}
      <FilmList>
        {bestList.map(item => (
          <StyledLink
            to={`movies/${item.id}`}
            key={item.id}
            state={{ from: '/' }}
          >
            <FilmCard>
              <FilmImg
                src={`${mainPhotoPath}${item.poster_path}`}
                alt={item.original_title}
              ></FilmImg>
              <h3>{item.original_title}</h3>
              <p>Release data: {item.release_date}</p>
            </FilmCard>
          </StyledLink>
        ))}
      </FilmList>
      {errorMessage && <Toaster message={errorMessage} />}
    </MainSection>
  );
};

export default HomeList;
