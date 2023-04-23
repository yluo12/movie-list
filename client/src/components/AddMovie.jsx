import React from 'react';
const {useState, useEffect} = React;

const AddMovie = ({setMovies, movies, addMoviesToServer}) => {
  const handleAddMovieClick = (e) => {
    let newMovieTitle = document.getElementById('addMovieInput').value;
    addMoviesToServer(newMovieTitle, (update) => {
      setMovies([...movies, {title: newMovieTitle, watched: false}]);
    });

    document.getElementById('addMovieInput').value = '';
  };

  return (
    <div className="addMovie">
      <input id="addMovieInput" placeholder="Add movie title here"></input>
      <button className="addBtn" onClick={handleAddMovieClick}>Add</button>
    </div>
  );
};

export default AddMovie;