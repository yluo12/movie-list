import React from 'react';
import AddMovie from './AddMovie.jsx';
import Search from './Search.jsx';
import WatchButton from './WatchButton.jsx';
import MovieEntry from './MovieEntry.jsx';
import MovieList from './MovieList.jsx';
import {getMoviesFromServer, addMoviesToServer, updateWatchPropInServer} from './httpRequest.js';

const {useState, useEffect} = React;

// const getMoviesFromServer = (callback) => {
//   fetch('/api/movies').then(data => {
//     return data.json();
//   }).then(movieArr => {
//     callback(movieArr);
//   }).catch(err => {
//     console.log('error fetching movies from server', err);
//   });
// };

// const addMoviesToServer = (newMovie, callback) => {
//   const update = {
//     title: newMovie
//   };
//   const options = {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify(update)
//   };
//   fetch('/api/movies', options).then(data => {
//     if (!data.ok) {console.log('Error', data.status)}
//     return data.json();
//   }).then(update => {
//     callback(update);
//   }).catch(err => {
//     console.log('Error posting movie to the server', err);
//   });
// };

// const updateWatchPropInServer = (queryObj, callback) => {
//   const options = {
//     method: 'PATCH',
//     headers: {'Content-Type': 'application/json; charset=UTF-8'},
//     body: JSON.stringify(queryObj)
//   };
//   fetch('/api/movies', options).then(data => {
//     if (!data.ok) {console.log('Error', data.status)}
//     return data.json(); // takes responses stream and reads it to completion
//   }).then(update => {
//     callback(update);
//   }).catch(err => {
//     console.log('Error updating watch property of the current movie to the server', err);
//   });
// };

// App component
const App = () => {

  const [movies, setMovies] = useState([]);
  const [moviesSearched, setMoviesSearched] = useState([]);

  let timeout = null;
  const getMoviesSearched = function (searchInput, watchState) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      var copy = [];
      movies.forEach((movie) => {
        let movieTitle = movie.title.toLowerCase();
        if (watchState !== undefined) {
          // console.log(movie.watched, watchState, 'watched');
          if (movieTitle.indexOf(searchInput) > -1 && Number(movie.watched) === watchState) {
            copy.push(movie);
          }
        } else {
          if (movieTitle.indexOf(searchInput) > -1) {
            copy.push(movie);
          }
        }
      });
      setMoviesSearched(copy);
        // if (!copy.length) {
        //   alert('no movie by that name found');
        // }
      }, 500);
  };

  const updateWatchedProp = (mObj) => {
    setMovies((movies) => {
      for (var i = 0; i < movies.length; i++) {
        if (movies[i].title === mObj.title) {
          movies[i].watched = movies[i].watched ? false : true;
        }
      }
      return movies;
    });
  };

  const updateWatchedList = (watchState) => {
    if (watchState === undefined) {
      getMoviesSearched('');
    } else {
      getMoviesSearched('', watchState);
    }
  };

  useEffect(() => {
    getMoviesFromServer((movieArr) => {
      setMovies(movieArr);
    });
  }, []);

  useEffect(() => {
    getMoviesSearched('');
  }, [movies]);
  // movies

  return (
  <div>
    <h2 className="title">MovieList</h2>
    <AddMovie setMovies={setMovies} movies={movies} addMoviesToServer={addMoviesToServer}/>
    <WatchButton updateWatchedList={updateWatchedList}/>
    <Search getMoviesSearched={getMoviesSearched}/>
    < MovieList movies={moviesSearched} updateWatchedProp={updateWatchedProp} setMovies={setMovies}/>
  </div>);
};



// search component
// const Search = ({getMoviesSearched}) => {
//   const handleInputChange = (e) => {
//     getMoviesSearched(e.target.value);
//   };

//   return (
//     <div className="searchBar">
//       <input className="searchInput" placeholder="Search..." onChange={handleInputChange}></input>
//       <button className="searchBtn" >Go!</button>
//     </div>
//   );
// };

// addMovie component
// const AddMovie = ({setMovies, movies}) => {
//   const handleAddMovieClick = (e) => {
//     let newMovieTitle = document.getElementById('addMovieInput').value;
//     setMovies([...movies, {title: newMovieTitle, watched: false}]);
//     document.getElementById('addMovieInput').value = '';
//   };

//   return (
//     <div className="addMovie">
//       <input id="addMovieInput" placeholder="Add movie title here"></input>
//       <button className="addBtn" onClick={handleAddMovieClick}>Add</button>
//     </div>
//   );
// };

// // watchButton component
// const WatchButton = ({updateWatchedList}) => {
//   const handleWatchedClick = (e) => {
//     updateWatchedList(true);
//   };
//   const handleToWatchClick = (e) => {
//     updateWatchedList(false);
//   };
//   return (
//     <>
//       <button id="watchedBtn" onClick={handleWatchedClick}>Watched</button>
//       <button id="toWatchedBtn" onClick={handleToWatchClick}>To Watch</button>
//     </>
//   );
// };

// // movieList component
// const MovieList = ({movies, updateWatchedProp}) => {
//   return (<div>
//     {movies.map((movieObj) => {
//       let movieTitle = movieObj.title;
//       return (< MovieEntry movieObj={movieObj} key={movieTitle} updateWatchedProp={updateWatchedProp}/>)
//     })};
//   </div>);
// };

// // MovieEntry component
// const MovieEntry = ({movieObj, updateWatchedProp}) => {
//   const [watched, updateWatched] = useState(false);
//   const [visible, updateVisible] = useState(false);
//   const handleWatchedClick = (e) => {
//     updateWatchedProp(movieObj);
//     updateWatched((watched) => !watched);
//   };

//   const handleTitleClick = (e) => {
//     updateVisible((visible) => !visible);
//   };

//   useEffect(() => {
//     updateWatchedProp(movieObj);
//   }, [visible]);

//   return (
//     <div>
//       <span className="movieTitle" onClick={handleTitleClick}>{movieObj.title}</span>
//       {visible && (<div className="movieInfo">
//         <p>Year: {movieObj.year}</p>
//         <p>Runtime: {movieObj.runtime}</p>
//         <p>Metascore: {movieObj.metascore}</p>
//         <p>imdbRating: {movieObj.imdbRating}</p>
//         <label>Watched: </label>
//         <input type="checkbox" onClick={handleWatchedClick}></input>
//       </div>)}
//     </div>
//   );
// };

export default App;