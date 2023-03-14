import { Toaster } from '../Toaster';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SearchBar } from '../searchbar/SearchBar';
import { LoaderBox } from '../loader/Loader.styles';
import Loader from '../loader/Loader';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [collections, setCollections] = useState([]);
  const [target, setTarget] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = targetSubmit => {
    if (!targetSubmit || targetSubmit.length === 0) {
      setErrorMessage('Please enter any words for request');
    } else {
      if (targetSubmit !== target) {
        setCollections([]);
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
          `https://api.themoviedb.org/3/search/movie?api_key=6c2e7884d8582c075e4f6889ea94f7ad&query=${target}`
        )
        .then(obj => {
          //   if (obj.data.hits.length === 0) {
          //     setErrorMessage(
          //       'There are no images for this request, please try another one!!!'
          //     );
          //     return;
          //   } else {
          //     setCollections(obj.data.results);
          //     setErrorMessage(null);
          //   }
          console.log(obj);
          console.log(obj.data.results);
        })
        .catch(error => {
          setErrorMessage(error);
        })
        .finally(setLoading(false));
    }
    Response();
  }, [target]);

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
          <Link to="/movies/:movieId" key={item.id}>
            {item.original_title} 🐷
          </Link>
        ))}
      </ul>
      {errorMessage && <Toaster message={errorMessage} />}
    </>
  );
};

export default Movies;
