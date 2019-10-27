const router = require('express').Router();
const path = require('path');
const shortid = require('shortid');
const shortUrlModel = require('../models/short_url');

router
  .route('/')
  .get((req, res) => {
    res.sendFile('home.html', { root: path.join(__dirname, '../public') });
  })
  .post(async (req, res) => {
    const full_url = req.body.url;
    const result = await shortUrlModel.findOne({ full_url });

    if (result) {
      res.status(201).send({ id: result.short_id });
    } else {
      console.log('not found... ', result);
      const short_id = shortid.generate();
      const newUrl = new shortUrlModel({
        full_url,
        short_id: shortid.generate()
      });
      await newUrl.save();
      res.status(201).send({ id: short_id });
    }
  });

module.exports = router;
