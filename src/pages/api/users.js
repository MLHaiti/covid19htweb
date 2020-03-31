import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
// import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs";
import { databaseOnly } from "middlewares/middleware";

import User from "models/user";

const handler = nextConnect();

handler.use(databaseOnly); // only the database

handler.get(async (req, res) => {
  const { password } = req.body;
  const { email } = req.body; // normalizeEmail(req.body.email);

  if (!email || !isEmail(email)) {
    res
      .status(400)
      .json({ error: true, message: "The email you entered is invalid." });
    return;
  }
  if (!password) {
    res.status(400).json({ error: true, message: "Missing field(s)" });
    return;
  }

  try {
    const currentUser = await User.findOne({
      email,
    });

    if (currentUser) {
      return res.status(403).json({
        message: "An account with that email already exist.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }

  const hashedPassword = await bcrypt.hash(password, 14);

  try {
    const user = await new User({
      email,
      password: hashedPassword,
    }).save();

    return res
      .status(201)
      .json({ message: "Account created", user: { email, id: user.id } });
  } catch (error) {
    return res.status(500).json({ message: "Could not create user" });
  }
});

export default handler;
