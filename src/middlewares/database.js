// import { MongoClient } from "mongodb";
import mongoose from "mongoose";

export async function withMongoose(req, res, next) {
  if (mongoose.connections[0].readyState) {
    req.mongoose = mongoose;
    next();
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    bufferCommands: false, // Disable mongoose buffering
    bufferMaxEntries: 0,
    dbName: "santepam",
    // autoIndex: true, // false TODO turn this to false once we have more data
  });
  req.mongoose = mongoose;
  next();
}
