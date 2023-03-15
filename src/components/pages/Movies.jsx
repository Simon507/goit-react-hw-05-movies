import { Toaster } from '../Toaster';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SearchBar } from '../searchbar/SearchBar';
import { LoaderBox } from '../loader/Loader.styles';
import Loader from '../loader/Loader';
import { LoadMore } from '../loadMoreBtn/LoadMoreBtn';
import { Link, useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [collections, setCollections] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({});
  // const [searchPage, setSearchPage] = useSearchParams('1');
  const productName = searchParams.get('targetSubmit') ?? '';
  const targetPage = searchParams.get('page');
  // const [target, setTarget] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // test

  const onBtnClick = () => {
    const usedTarget = searchParams.get('targetSubmit');
    const usedPage = searchParams.get('page');
    const newPage = Number(usedPage) + 1;
    console.log(usedTarget);
    console.log(usedPage);
    console.log(newPage);
    setSearchParams({ targetSubmit: usedTarget, page: newPage });
    // let pageNumber = page;
    // console.log(page);
    // pageNumber = Number(pageNumber) + Number(1);
    // const nextPage = pageNumber;
    // console.log(nextPage);
    // setPage(nextPage);
  };

  // const targetPage = searchPage.get('page') ?? '8';
  console.log(targetPage);

  const onSubmit = targetSubmit => {
    console.log(searchParams);
    if (targetSubmit !== searchParams) {
      setCollections([]);
      // setSearchPage(1);
    }
    console.log(targetSubmit);
    const nextParams = targetSubmit !== '' ? { targetSubmit } : {};
    console.log(nextParams);
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
          console.log(obj);
          if (obj.data.results.length === 0) {
            setErrorMessage(
              'There are no movies for this request, please try another one!!!'
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
  }, [targetPage, productName]);

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
          <Link
            to={`${item.id}`}
            key={item.id}
            state={{ from: `/movies?${searchParams}` }}
          >
            {item.original_title} 🐷
          </Link>
        ))}
      </ul>
      {collections.length > 0 && targetPage < totalPage && (
        <LoadMore onBtnClick={onBtnClick} />
      )}

      {errorMessage && <Toaster message={errorMessage} />}
    </>
  );
};

export default Movies;
