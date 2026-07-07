import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export default dbConnect;

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }
  await mongoose.connect(MONGODB_URI);
  return mongoose;
}

export async function getMongoDetails() {
  // Ensure Mongoose is connected
  if (mongoose.connection.readyState !== 1) {
    await dbConnect();
  }

  // Extract the native instances from the active Mongoose connection
  const client = mongoose.connection.getClient(); // The MongoClient instance
  const db = mongoose.connection.db; // The Db instance

  if (!db || !client) {
    throw new Error(
      "Failed to retrieve native MongoDB instances from Mongoose.",
    );
  }

  return { client, db };
}
