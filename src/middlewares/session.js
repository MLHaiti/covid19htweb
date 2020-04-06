/**
 * Will add userInformation to req
 */

import jwt from "jsonwebtoken";
import cookie from "cookie";

const jwtSecret = process.env.JWT_SECRET;

const clearCookieToken = cookie.serialize("token", "", {
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: -1,
  httpOnly: true,
  path: "/",
});

export default async function (req, res, next) {
  const { token } = req.cookies;

  if (token) {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      next();
    } catch (error) {
      req.completed = true;
      res.setHeader("Set-Cookie", clearCookieToken);
      return res
        .status(401)
        .json({ message: "Access is forbidden. You must authenticate" });
    }
  } else {
    req.completed = true;
    res.setHeader("Set-Cookie", clearCookieToken);
    return res
      .status(403)
      .json({ message: "Access is forbidden. You must authenticate" });
  }
}
