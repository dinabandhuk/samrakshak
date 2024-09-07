const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

const mongoUri = "mongodb://localhost:27017";
const dbName = "asianHack";

// Create a GridFS bucket
let bucket;

async function connectDB() {
  try {
    await mongoose.connect(mongoUri, { dbName });
    console.log("Connected to Database");

    const db = mongoose.connection.db;
    bucket = new GridFSBucket(db, { bucketName: "uploads" });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

function getBucket() {
  if (!bucket) {
    throw new Error("GridFS bucket is not initialized");
  }
  return bucket;
}

module.exports = { connectDB, getBucket };
