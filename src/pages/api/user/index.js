import nextConnect from "next-connect";
import bcrypt from "bcryptjs";
import User from "models/user";
import middleware from "middlewares/middleware";
import { removeKeys } from "utils/api-helpers";

const handler = nextConnect();

handler.use(middleware);

handler.patch(async (req, res) => {
  const { password, newPassword } = req.body;
  const { email } = req.user;

  if (!password || !newPassword) {
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

  const data = req.body.data || {};

  return;

  try {
    await user.save();
    return res.json({ message: "Password updated" });
  } catch (error) {
    return res.status(500).json({ message: "Password update failed" });
  }
});

export default handler;
