import jwt from "jsonwebtoken";
import cookie from "cookie";
import ms from "ms";

export const expirationTime = ms("1d");

export const serializeCookie = (name, data) => {
  const serialized = cookie.serialize(name, data, {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: expirationTime,
    httpOnly: true,
    path: "/",
  });
  return serialized;
};

export const jwtSigner = (data, jwtSecret = process.env.JWT_SECRET) =>
  jwt.sign(data, jwtSecret, {
    expiresIn: expirationTime,
  });
