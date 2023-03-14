import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoaderBox } from '../loader/Loader.styles';
import Loader from '../loader/Loader';
import { Toaster } from '../Toaster';

export const HomeList = () => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [bestList, setBestList] = useState([]);

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
    <>
      {isLoading && (
        <LoaderBox>
          <Loader />
        </LoaderBox>
      )}
      <ul>
        {bestList.map(item => (
          <Link to="/movies/:movieId" key={item.id}>
            {item.original_title} 🐷
          </Link>
        ))}
      </ul>
      {errorMessage && <Toaster message={errorMessage} />}
    </>
  );
};
