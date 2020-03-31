// import { MongoClient } from "mongodb";
import mongoose from "mongoose";

// const client = new MongoClient(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// export async function setUpDb(db) {
//   await db
//     .collection("tokens")
//     .createIndex("expireAt", { expireAfterSeconds: 0 });
// }

// export default async function database(req, res, next) {
//   if (!client.isConnected()) await client.connect();
//   console.log(" we are connected");
//   req.dbClient = client;
//   req.db = client.db(process.env.DB_NAME);
//   await setUpDb(req.db);
//   console.log(" going next");
//   return next();
// }

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
