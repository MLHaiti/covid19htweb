/**
 * Will add userInformation to req
 */

import jwt from "jsonwebtoken";
import cookie from "cookie";

const jwtSecret = process.env.JWT_SECRET;

export default function (req, res, next) {
  const cookies = cookie.parse(req.headers.cookie ?? "");
  const { token } = cookies;

  if (token) {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      next();
    } catch (error) {
      const cookieSerialized = cookie.serialize("token", "", {
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: -1,
        httpOnly: true,
        path: "/",
      });

      res.setHeader("Set-Cookie", cookieSerialized);
      return res
        .status(401)
        .json({ message: "Access is forbidden. You must authenticate" });
    }
  }

  const cookieSerialized = cookie.serialize("token", "", {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: -1,
    httpOnly: true,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookieSerialized);
  return res
    .status(403)
    .json({ message: "Access is forbidden. You must authenticate" });
}
