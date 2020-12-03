const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // connect mongoose to mongoDB atlas => cloud database for mongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB connected..');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // exit with failure code 1
  }
};

module.exports = connectDB;
