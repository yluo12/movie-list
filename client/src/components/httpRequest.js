const getMoviesFromServer = (callback) => {
  fetch('/api/movies').then(data => {
    return data.json();
  }).then(movieArr => {
    callback(movieArr);
  }).catch(err => {
    console.log('error fetching movies from server', err);
  });
};

const addMoviesToServer = (newMovie, callback) => {
  const update = {
    title: newMovie
  };
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(update)
  };
  fetch('/api/movies', options).then(data => {
    if (!data.ok) {console.log('Error', data.status)}
    return data.json();
  }).then(update => {
    callback(update);
  }).catch(err => {
    console.log('Error posting movie to the server', err);
  });
};

const updateWatchPropInServer = (queryObj, callback) => {
  const options = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    body: JSON.stringify(queryObj)
  };
  fetch('/api/movies', options).then(data => {
    if (!data.ok) {console.log('Error', data.status)}
    return data.json(); // takes responses stream and reads it to completion
  }).then(update => {
    callback(update);
  }).catch(err => {
    console.log('Error updating watch property of the current movie to the server', err);
  });
};

export {getMoviesFromServer, addMoviesToServer, updateWatchPropInServer};