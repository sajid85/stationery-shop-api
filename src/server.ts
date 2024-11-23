import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connected to MongoDB');

    app.listen(config.port, () => {
      console.log(`Example app listening 👂🏻 on port ${config.port}`);
    });
  } catch (err) {
    console.log('Error connecting to MongoDB:', err);
  }
}

main();
