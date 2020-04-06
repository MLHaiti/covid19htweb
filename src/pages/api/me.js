import nextConnect from "next-connect";
import session from "middlewares/session";
import User from "models/user";
// import { getUser } from "utils/api-helpers";

const handler = nextConnect();

handler.use(session);

/**
 * We will use this route to send public information to the front-end about the user
 */
handler.get(async (req, res) => {
  // let's return the user profile
  const { email } = req.user;

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

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ user: user.info });
});

const patchActions = ["updateProfile"];

handler.patch(async (req, res) => {
  const { data, action } = req.body;
  const { email } = req.user;

  if (!patchActions.includes(action)) {
    return res.status(400).json({ message: "Unknown" });
  }

  let user = null;

  try {
    user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }

  if (action === "updateProfile") {
    const { firstName, lastName, signature } = data;
    // because undefined would remove the current field if present
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.signature = signature || user.signature;
  }

  try {
    await user.save();
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

export default handler;
