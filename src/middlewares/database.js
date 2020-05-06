// import { MongoClient } from "mongodb";
import mongoose from "mongoose";

export default async function (req, res, next) {
  if (mongoose.connections[0].readyState) {
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
    // autoIndex: false, // TODO we will deactivate auto-index but we will need to stll build the indexes
  });
  req.mongoose = mongoose;
  next();
}
