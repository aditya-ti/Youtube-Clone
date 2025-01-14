import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

async function connectToDatabase() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`||"mongodb+srv://cluster0:rupak@cluster0.lieknki.mongodb.net"
      // Options object
    );
    console.log(
      `MONGODB Connected!! DB Host : ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("MONGODB CONNECTION FAILED :: ", err);
    process.exit(1);
  }
}

export default connectToDatabase;
