const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handles sync unhandle exception
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION');
  console.log('App shotting down...');
  console.log(err.name, err.message);
  console.log(err);
  process.exit();
});

dotenv.config({ path: '.env' });

const app = require('./app');

console.log(process.env.NODE_ENV);

mongoose
  .connect(process.env.DATABASE, {
  // .connect(process.env.LOCAL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DATABASE CONNECTED');
  })
  .catch((err) => {
    console.log(err);
    console.log('ERROR OCCURED CONNECTING DB');
  });

const port = process.env.PORT || 3700;

const server = app.listen(port, () =>
  console.log(`App running on port http://127.0.0.1:${port}`)
);

process.on('uncaughtException', (err) => {
  console.log('UNHANDLED REJECTION');
  console.log('App shoting down...');
  console.log(err.name, err.message);
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
