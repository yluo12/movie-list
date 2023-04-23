import React from 'react';
const {useState, useEffect} = React;

const WatchButton = ({updateWatchedList}) => {
  const handleWatchedClick = (e) => {
    updateWatchedList(1);
  };
  const handleToWatchClick = (e) => {
    updateWatchedList(0);
  };

  const handleAllMoviesClick = (e) => {
    updateWatchedList();
  };

  return (
    <>
      <button id="watchedBtn" onClick={handleWatchedClick}>Watched</button>
      <button id="toWatchedBtn" onClick={handleToWatchClick}>To Watch</button>
      <button id="allMovieBtn" onClick={handleAllMoviesClick}>All Movies</button>
    </>
  );
};

export default WatchButton;

//