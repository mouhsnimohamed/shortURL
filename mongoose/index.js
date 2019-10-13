const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectToDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-3bswp.mongodb.net/test?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('connected to db successfly');
  } catch (error) {
    console.log('cant connect to db');
  }
};

module.exports = connectToDB;
