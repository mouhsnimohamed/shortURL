const mongoose = require('mongoose');

const ShortUrlSchema = mongoose.Schema({
  // short_url: String,
  full_url: String,
  short_id: String,
  date: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('shorturl', ShortUrlSchema);
