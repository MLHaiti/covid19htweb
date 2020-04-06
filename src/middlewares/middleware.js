import nextConnect from "next-connect";
import mongoose from "./database";
import session from "./session";

export const databaseOnly = nextConnect().use(mongoose);

// Default middleware is for protected routes
const protectedRoutes = nextConnect().use(session).use(mongoose);

export default protectedRoutes;
