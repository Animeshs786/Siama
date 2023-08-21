const mongoose = require('mongoose');
const { DB_URI, DB_URI_LOCAL, ENV_MODE } = process.env;

const db_uri = ENV_MODE === 'production' ? DB_URI : DB_URI_LOCAL;

const connectToDatabase = async () => {
  console.log(`Connecting to ${ENV_MODE === 'production' ? 'live' : 'local'} database.`);
  mongoose.connection
    .on('error', (err) => console.log('Database connection error:', err.message))
    .on('open', (err) => console.log(`Database connection is open.`))
    .on('connected', () => console.log('Database connection established.'))
    .on('disconnected', () => console.log('Database disconnected.'));

  return new Promise((resolve, reject) => {
    mongoose
      .connect(db_uri)
      .then(resolve)
      .catch((err) => {
        console.log('Unable to connect to the database:', err.message);
        mongoose.connection.close(); //also emmits disconnected
        reject(err);
      });
  });
};

module.exports = connectToDatabase;
