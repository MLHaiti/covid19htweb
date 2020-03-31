import cookie from "cookie";
import nextConnect from "next-connect";

const onNoMatch = async (req, res) => {
  // TODO make sure to do invalidation where there is a db state

  const cookieSerialized = cookie.serialize("token", "", {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: -1,
    httpOnly: true,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookieSerialized);
  return res.json({ message: "Logout Successful" });
};

// We will logout the user whatever the method used
const handler = nextConnect({ onNoMatch });

export default handler;
