// const models = require('../models/index.js');

// module.exports = {
//   get: (req, res) => {
//     models.getAll((err, results) => {
//       if (err) {
//         console.log('Unable to retrieve movie list from the database: ', err);
//         res.sendStatus(500);
//       } else {
//         res.sendStatus(201);
//       }
//     });

//   },

//   post: (req, res) => {
//     models.create(req.body, (err, results) => {
//       if (err) {
//         console.log('Unable to post movie to the database: ', err);
//         res.sendStatus(500);
//       } else {
//         res.sendStatus(201);
//       }
//     });
//   }
// };