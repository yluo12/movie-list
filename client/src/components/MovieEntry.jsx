import React from 'react';
import {getMoviesFromServer, addMoviesToServer, updateWatchPropInServer} from './httpRequest.js';
const {useState, useEffect} = React;

const MovieEntry = ({movieObj, updateWatchedProp, setMovies}) => {
  const [watched, updateWatched] = useState(movieObj.watched);
  // const [visible, updateVisible] = useState(false);
  const handleWatchedClick = (e) => {
    const movieTitle = e.target.previousElementSibling.textContent;
    const movieObj = {title: movieTitle};
    if (Number(watched) === 0) {
       movieObj.watched = 1;
    } else {
      movieObj.watched = 0;
    }
    updateWatchPropInServer(movieObj, (update) => {
      // console.log(update, 'patch request');
    });
    updateWatched((watched) => {
      return Number(watched) === 1 ? 0 : 1;
    });
  };
  // const handleTitleClick = (e) => {
  //   updateVisible((visible) => !visible);
  // };
  //onClick={handleTitleClick}

  useEffect(() => {
    getMoviesFromServer((movieArr) => {
      setMovies(movieArr);
    });
  }, [watched]);

  return (
    <div>
      <span className="movieTitle" >{movieObj.title}</span>
      <button onClick={handleWatchedClick}>{(Number(watched) === 1) ? 'watched' : 'to watch'}</button>
    </div>
  );
};

export default MovieEntry;

// {visible && (<div className="movieInfo">
//         <p>Year: {movieObj.year}</p>
//         <p>Runtime: {movieObj.runtime}</p>
//         <p>Metascore: {movieObj.metascore}</p>
//         <p>imdbRating: {movieObj.imdbRating}</p>
//         <label>Watched: </label>
//         <input type="checkbox" onClick={handleWatchedClick}></input>
//       </div>)}