const router = require('express').Router();
const models = require('./models/index.js');

router.get('/api/movies', (req, res) => {
  // console.log('inside get method', req);
  models.getAll((err, results) => {
    if (err) {
      console.log('Unable to retrieve movie list from the database: ', err);
      res.sendStatus(500);
    } else {
      res.send(results);
    }
  });
});

router.post('/api/movies', (req, res) => {
  models.create(req.body, (err, results) => {
    if (err) {
      console.log('Unable to post movie to the database: ', err);
      res.sendStatus(500);
    } else {
      res.send(req.body);
    }
  });
});

router.delete('/api/movies', (req, res) => {
  res.send('hello');
});

router.patch('/api/movies', (req, res) => {
  models.update(req.body, (err, results) => {
    if (err) {
      console.log('Unable to update watched feature of the current movie', err);
      res.sendStatus(500);
    } else {
      // res.sendStatus(201);
      res.send(req.body);
    }
  });
});

module.exports = router;