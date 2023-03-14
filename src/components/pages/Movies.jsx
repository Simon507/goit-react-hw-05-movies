import { Toaster } from '../Toaster';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SearchBar } from '../searchbar/SearchBar';
import { LoaderBox } from '../loader/Loader.styles';
import Loader from '../loader/Loader';
import { LoadMore } from '../loadMoreBtn/LoadMoreBtn';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [collections, setCollections] = useState([]);
  const [target, setTarget] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const onBtnClick = e => {
    let pageNumber = page;
    pageNumber += 1;
    setPage(pageNumber);
  };

  const onSubmit = targetSubmit => {
    if (!targetSubmit || targetSubmit.length === 0) {
      setErrorMessage('Please enter any words for request');
    } else {
      if (targetSubmit !== target) {
        setCollections([]);
        setPage(1);
      }

      setTarget(targetSubmit);
      setErrorMessage(null);
    }
  };

  useEffect(() => {
    if (!target) {
      return;
    }
    setLoading(true);

    async function Response() {
      await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=6c2e7884d8582c075e4f6889ea94f7ad&query=${target}&language=en-US&page=${page}`
        )
        .then(obj => {
          // console.log(obj);
          if (obj.data.results.length === 0) {
            setErrorMessage(
              'There are no images for this request, please try another one!!!'
            );
            return;
          } else {
            setCollections(prevState => [...prevState, ...obj.data.results]);
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
  }, [target, page]);

  return (
    <>
      <SearchBar onSubmit={onSubmit}></SearchBar>

      {isLoading && (
        <LoaderBox>
          <Loader />
        </LoaderBox>
      )}
      <ul>
        {collections.map(item => (
          <Link to={`${item.id}`} key={item.id}>
            {item.original_title} 🐷
          </Link>
        ))}
      </ul>
      {collections.length > 0 && page < totalPage && (
        <LoadMore onBtnClick={onBtnClick} />
      )}

      {errorMessage && <Toaster message={errorMessage} />}
    </>
  );
};

export default Movies;
