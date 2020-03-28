import cookie from "cookie";
import { SECRET_COOKIE } from "utils/auth";

// TODO make sure to send bad request for other types
export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? "");
  const secret = cookies[SECRET_COOKIE];

  if (!secret) {
    return res.status(401).send("Auth cookie missing.");
  }

  console.log(secret);

  res.status(200).json({ secret });
};
