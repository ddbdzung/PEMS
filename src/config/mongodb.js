const mongoose = require('mongoose');
const config = require('./config')

async function connect() {
  try {
    if (config.env === 'production') {
      mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.mongodb.net/?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connect to MongoDB Atlas successfully!');
    } else if (config.env === 'development') {
      mongoose.connect('mongodb://localhost:27017/pems', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connect to MongoDB Local successfully!');
    }
  } catch (err) {
    console.error('Error connecting to MongoDB!');
  }
}

module.exports = { connect };
