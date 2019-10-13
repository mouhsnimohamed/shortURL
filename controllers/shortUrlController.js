const router = require('express').Router();

router
  .route('/')
  .get((req, res) => {
    res.send('work from route');
  })
  .post((req, res) => {
    res.status(201).send('great news');
  });

module.exports = router;
