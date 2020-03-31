import nextConnect from "next-connect";
import { withMongoose } from "./database";
import session from "./session";

export const databaseOnly = nextConnect().use(withMongoose);

// Default middleware is for protected routes
const protectedRoutes = nextConnect().use(session).use(withMongoose);

export default protectedRoutes;
