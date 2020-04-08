import nextConnect from "next-connect";
import isEmail from "validator/lib/isEmail";
import services from "middlewares/middleware";
import managerRole from "middlewares/manager";
import User from "models/user";
import {
  managerialRoles,
  roleCheck,
  findTransferableRoles,
} from "utils/user-helpers";

const handler = nextConnect();

handler.use(services).use(managerRole);

/**
 * We will use this route to send public information to the front-end about the user
 */
handler.get(async (req, res) => {
  const { email: targetEmail } = req.query;

  if (!targetEmail || !isEmail(targetEmail)) {
    res.status(400).json({ message: "Missing field(s)" });
    return;
  }

  let user = null;

  try {
    user = await User.findOne({
      email: targetEmail,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }

  res.json({ user: user.info });
});

// const validateActions = (action, params) => {
//   switch (action) {
//     case "updateRoles":
//       // eslint-disable-next-line
//       const { data, userEmail } = params;
//       if (!userEmail || !Array.isArray(data)) {
//         return false;
//       }
//       return true;
//     default:
//       return false;
//   }
// };

const patchActions = ["updateRoles"];
handler.patch(async (req, res) => {
  const { data: roles, action, userEmail } = req.body;

  if (!Array.isArray(roles) || !action || !isEmail(userEmail)) {
    res.status(400).json({ message: "Missing field(s)" });
    return;
  }

  if (!patchActions.includes(action)) {
    return res.status(400).json({ message: "Unknown action" });
  }

  let user = null;

  try {
    user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }

  const transferableRoles = findTransferableRoles(
    req.user.isAdmin,
    req.user.roles
  );

  if (action === "updateRoles") {
    const currentRoles = user.roles || [];
    roles.forEach((r) => {
      // either a new role or a role which was already present
      if (!transferableRoles.includes(r) && !currentRoles.includes(r)) {
        return res.status(400).json({ message: "We cannot fullfil request" });
      }
    });
    user.roles = roles;
  }

  try {
    await user.save();
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
});

export default handler;
