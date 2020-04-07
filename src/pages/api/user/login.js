import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
import { databaseOnly } from "middlewares/middleware";
import bcrypt from "bcryptjs";
import { jwtSigner, serializeCookie } from "utils/auth-helpers";
import User from "models/user";

const jwtSecret = process.env.JWT_SECRET;

const handler = nextConnect();

handler.use(databaseOnly);

handler.post(async (req, res) => {
  const { password } = req.body;
  const { email } = req.body;
  if (!isEmail(email)) {
    res.status(400).send("The email you entered is invalid.");
    return;
  }

  if (!password) {
    res.status(400).send("Missing field(s)");
    return;
  }

  let user = null;

  try {
    user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }

  const match = bcrypt.compareSync(password, user.password);
  if (match) {
    const token = jwtSigner(
      { userId: user._id, email: user.email, roles: user.roles },
      jwtSecret
    );
    // sent the cookie
    const cookieSerialized = serializeCookie("token", token);
    res.setHeader("Set-Cookie", cookieSerialized);
    return res.json({ token });
  }
  return res.status(401).json({ message: "Auth Failed" });
});

export default handler;
