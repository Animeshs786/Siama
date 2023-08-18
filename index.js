require('dotenv').config();
const app = require('./src/app');
const connectToDatabase = require('./src/db');
const { PORT, BASE_URL } = process.env;

(async () => {
  try {
    console.log('Initializing server');
    await connectToDatabase();
    app
      .listen(PORT, () => console.log(`Server is running on ${BASE_URL}`))
      .on('error', (error) => {
        console.log('Unable to initaialise the server:', error.message);
        process.exit(1);
      });
  } catch (error) {
    process.exit(1);
  }
})();
