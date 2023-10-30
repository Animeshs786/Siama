require('dotenv').config();
const { connectToDatabase } = require('./config');
const app = require('./src/app');

const { PORT, BASE_URL } = process.env;

(async () => {
  try {
    console.log('Initializing server');
    await connectToDatabase();
    app
      .listen(PORT, () => console.log(`Server is running on ${BASE_URL}`))
      .on('error', (error) => {
        console.log('Unable to initialize the server:', error.message);
        process.exit(1);
      });
  } catch (error) {
    process.exit(1);
  }
})();
/**
 * TODO: file upload common function
 */

/*

*/
