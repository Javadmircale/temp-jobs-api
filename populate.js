require("dotenv").config();
const connectDB = require("./db/connect");
const User = require("./models/User");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await User.deleteMany({});
    console.log("SUCCESS!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
