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
    try {
      const full_url = req.body.url;
      const result = await shortUrlModel.findOne({ full_url });
      const baseUrl = req.headers.host;
      if (result) {
        res.status(201).send({ id: result.short_id });
      } else {
        const short_id = shortid.generate();
        const newUrl = new shortUrlModel({
          full_url,
          short_url: `${baseUrl}/${short_id}`,
          short_id: short_id
        });

        await newUrl.save();
        res.status(201).send({ id: short_id });
      }
    } catch (error) {
      console.log('error on post URL', error);
      res.status(500).json({ message: 'server error' });
    }
  });

router.get('/:id', async (req, res) => {
  try {
    const {
      params: { id: short_id }
    } = req;
    const result = await shortUrlModel.findOne({ short_id });
    /*  REDIRECt IF ID was Found in DB */
    if (result) {
      res.redirect(result.full_url);
    }
    res.send('ID invalid');
  } catch (error) {
    res.status(500).send('ServerError');
    console.log('error on ID redirection');
  }
});

module.exports = router;
