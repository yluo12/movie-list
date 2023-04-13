import React from 'react';

const {useState, useEffect} = React;


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
        if (watchState !== undefined) {
          let movieTitle = movie.title.toLowerCase();
          if (movieTitle.indexOf(searchInput) > -1 && movie.watched === watchState) {
            copy.push(movie);
          }
        } else {
          let movieTitle = movie.title.toLowerCase();
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

  const updateWatchedProp = (m) => {
    setMovies((movies) => {
      for (var i = 0; i < movies.length; i++) {
        if (movies[i].title === m) {
          movies[i].watched = movies[i].watched ? false : true;
        }
      }
      return movies;
    });
  };

  const updateWatchedList = (watchState) => {
    getMoviesSearched('', watchState);
  };

  useEffect(() => {
    getMoviesSearched('');
  }, [movies]);

  return (
  <div>
    <h2 className="title">MovieList</h2>
    <AddMovie setMovies={setMovies} movies={movies}/>
    <WatchButton updateWatchedList={updateWatchedList}/>
    <Search getMoviesSearched={getMoviesSearched}/>
    < MovieList movies={moviesSearched} updateWatchedProp={updateWatchedProp}/>
  </div>);
};



// search component
const Search = ({getMoviesSearched}) => {
  const handleInputChange = (e) => {
    getMoviesSearched(e.target.value);
  };

  return (
    <div className="searchBar">
      <input className="searchInput" placeholder="Search..." onChange={handleInputChange}></input>
      <button className="searchBtn" >Go!</button>
    </div>
  );
};

// addMovie component
const AddMovie = ({setMovies, movies}) => {
  const handleAddMovieClick = (e) => {
    let newMovieTitle = document.getElementById('addMovieInput').value;
    setMovies([...movies, {title: newMovieTitle, watched: false}]);
    document.getElementById('addMovieInput').value = '';
  };

  return (
    <div className="addMovie">
      <input id="addMovieInput" placeholder="Add movie title here"></input>
      <button className="addBtn" onClick={handleAddMovieClick}>Add</button>
    </div>
  );
};

// watchButton component
const WatchButton = ({updateWatchedList}) => {
  const handleWatchedClick = (e) => {
    updateWatchedList(true);
  };
  const handleToWatchClick = (e) => {
    updateWatchedList(false);
  };
  return (
    <>
      <button id="watchedBtn" onClick={handleWatchedClick}>Watched</button>
      <button id="toWatchedBtn" onClick={handleToWatchClick}>To Watched</button>
    </>
  );
};

// movieList component
const MovieList = ({movies, updateWatchedProp}) => {
  return (<div>
    {movies.map((movieObj) => {
      let movie = movieObj.title;
      return (< MovieEntry movie={movie} key={movie} updateWatchedProp={updateWatchedProp}/>)
    })};
  </div>);
};

// MovieEntry component
const MovieEntry = ({movie, updateWatchedProp}) => {
  const [watched, updateWatched] = useState(false);
  const handleWatchedClick = (e) => {
    updateWatchedProp(movie);
    updateWatched((watched) => !watched);
  };
  return (
    <div>
      <span className="movie">{movie}</span>
      <button onClick={handleWatchedClick}>{watched ? 'Watched' : 'To Watch'}</button>
    </div>
  );
};

export default App;