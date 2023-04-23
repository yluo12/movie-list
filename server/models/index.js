const dbConnection = require('../db');

module.exports = {
  getAll: (callback) => {
    let queryStr = 'SELECT * FROM movies';
    dbConnection.query(queryStr, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  create: (params, callback) => {
    // params is an object with title prop
    let queryStr = `INSERT INTO movies (title) VALUES (?);`;
    // console.log(params, "params passed from router.post");
    dbConnection.query(queryStr, params.title, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },

  update: (params, callback) => {
    let queryStrSelect = `SELECT id FROM movies WHERE title=('${params.title}');`;
    dbConnection.query(queryStrSelect, (err, idResults) => {
      if (err) {
        callback(err);
      } else {
        let queryStr = `UPDATE movies SET watched=(${(params.watched)}) WHERE id=('${idResults[0].id}')`;
        dbConnection.query(queryStr, (err, results) => {
          if (err) {
            callback(err);
          } else {
            callback(null, results);
          }
        });
      }
    });
    // dbConnection.query(queryStr, (err, results) => {
    //   if (err) {
    //     callback(err);
    //   } else {
    //     callback(null, results);
    //   }
    // });
  }
};