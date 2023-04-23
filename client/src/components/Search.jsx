import React from 'react';
const {useState, useEffect} = React;

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

export default Search;