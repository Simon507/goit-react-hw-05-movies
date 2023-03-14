import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoaderBox } from '../loader/Loader.styles';
import Loader from '../loader/Loader';
import { Toaster } from '../Toaster';
import { LoadMore } from '../loadMoreBtn/LoadMoreBtn';
import { nanoid } from 'nanoid';

export const Reviews = () => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [review, setReview] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const { movieId } = useParams();
  const mainPhotoPath = 'https://image.tmdb.org/t/p/original';
  const anonimous = 'https://pixabay.com/images/id-4764566/';

  const onBtnClick = e => {
    let pageNumber = page;
    pageNumber += 1;
    setPage(pageNumber);
  };

  useEffect(() => {
    async function Response() {
      await axios
        .get(
          `
https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=6c2e7884d8582c075e4f6889ea94f7ad&language=en-US&page=${page}`
        )
        .then(obj => {
          console.log(obj);

          setReview(prevState => [...prevState, ...obj.data.results]);
          setTotalPage(obj.data.total_pages);
        })
        .catch(error => {
          setErrorMessage(error);
        })
        .finally(setLoading(false));
    }
    Response();
  }, [movieId, page]);

  return (
    <>
      {isLoading && (
        <LoaderBox>
          <Loader />
        </LoaderBox>
      )}
      <ul>
        {review.map(item => (
          <li key={nanoid(8)}>
            <h4>{item.author}</h4>
            {!item.author_details.avatar_path ||
            item.author_details.avatar_path.length > 50 ? (
              <img
                src="https://www.gravatar.com/avatar/96c2e0e4ac98450f9e8e3c0a0a40aad8.jpg"
                alt="userAvatar"
              />
            ) : (
              <img
                src={`${mainPhotoPath}${item.author_details.avatar_path}`}
                alt="userAvatar"
              />
            )}

            <p>{item.content}</p>
            <p>{item.created_at}</p>
            <p>{item.updated_at}</p>
          </li>
        ))}
      </ul>
      {review.length > 0 && page < totalPage && (
        <LoadMore onBtnClick={onBtnClick} />
      )}
      {errorMessage && <Toaster message={errorMessage} />}
    </>
  );
};
