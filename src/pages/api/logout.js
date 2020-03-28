import cookie from "cookie";
import { SECRET_COOKIE, COOKIE_OPTION } from "utils/auth";

// TODO make sure to send bad request for other types
export default async (req, res) => {
  // TODO make sure to do invalidation where there is a db state

  res.setHeader(
    "Set-Cookie",
    cookie.serialize(SECRET_COOKIE, "", COOKIE_OPTION)
  );
  return res.json({ ok: true });
};
