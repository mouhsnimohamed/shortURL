const router = require('express').Router();
const path = require('path');

router
  .route('/')
  .get((req, res) => {
    res.sendFile('home.html', { root: path.join(__dirname, '../public') });
  })
  .post((req, res) => {
    res.status(201).send({ url: 'https://www.google.com' });
  });

module.exports = router;
