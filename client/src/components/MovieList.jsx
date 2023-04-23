import React from 'react';
const {useState, useEffect} = React;

import MovieEntry from './MovieEntry.jsx';

const MovieList = ({movies, updateWatchedProp, setMovies}) => {
  return (<div>
    {movies.map((movieObj) => {
      let movieTitle = movieObj.title;
      return (< MovieEntry movieObj={movieObj} key={movieTitle} updateWatchedProp={updateWatchedProp} setMovies={setMovies}/>)
    })};
  </div>);
};


export default MovieList;