import { Toaster } from '../Toaster';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SearchBar } from '../searchbar/SearchBar';
import { LoaderBox } from '../loader/Loader.styles';
import Loader from '../loader/Loader';
import { LoadMore } from '../loadMoreBtn/LoadMoreBtn';
import { useSearchParams } from 'react-router-dom';
import {
  StyledLink,
  MainSection,
  FilmList,
  FilmCard,
  FilmImg,
} from './Movies.styled';

const Movies = () => {
  const [collections, setCollections] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({});

  const productName = searchParams.get('targetSubmit') ?? '';
  const targetPage = searchParams.get('page');

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [totalPage, setTotalPage] = useState(1);

  const mainPhotoPath = 'https://image.tmdb.org/t/p/original';

  const onBtnClick = () => {
    const usedTarget = searchParams.get('targetSubmit');
    const usedPage = searchParams.get('page');
    const newPage = Number(usedPage) + 1;

    setSearchParams({ targetSubmit: usedTarget, page: newPage });
  };

  const onSubmit = targetSubmit => {
    if (targetSubmit !== productName) {
      setCollections([]);
    }

    const nextParams = targetSubmit !== '' ? { targetSubmit } : {};

    setSearchParams({ targetSubmit: nextParams.targetSubmit, page: 1 });

    setErrorMessage(null);
  };

  useEffect(() => {
    if (!productName) {
      return;
    }
    setLoading(true);

    async function Response() {
      await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=6c2e7884d8582c075e4f6889ea94f7ad&query=${productName}&language=en-US&page=${targetPage}`
        )
        .then(obj => {
          if (obj.data.results.length === 0) {
            setErrorMessage(
              'There are no movies for this request, please try another one!!!'
            );
            return;
          } else {
            setCollections(obj.data.results);
            setTotalPage(obj.data.total_pages);
            setErrorMessage(null);
          }
        })
        .catch(error => {
          setErrorMessage(error);
        })
        .finally(setLoading(false));
    }
    Response();
  }, [targetPage, productName]);

  return (
    <MainSection>
      <SearchBar onSubmit={onSubmit}></SearchBar>

      {isLoading && (
        <LoaderBox>
          <Loader />
        </LoaderBox>
      )}

      <FilmList>
        {collections.map(item => (
          <StyledLink
            to={`${item.id}`}
            key={item.id}
            state={{ from: `/movies?${searchParams}` }}
          >
            <FilmCard>
              {item.poster_path ? (
                <FilmImg
                  src={`${mainPhotoPath}${item.poster_path}`}
                  alt={item.original_title}
                ></FilmImg>
              ) : (
                <FilmImg
                  src={
                    'https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png'
                  }
                  alt={item.original_title}
                ></FilmImg>
              )}
              <h3>{item.original_title}</h3>
              <p>Release data: {item.release_date}</p>
            </FilmCard>
          </StyledLink>
        ))}
      </FilmList>

      {collections.length > 0 && targetPage < totalPage && (
        <LoadMore onBtnClick={onBtnClick} />
      )}

      {errorMessage && <Toaster message={errorMessage} />}
    </MainSection>
  );
};

export default Movies;
