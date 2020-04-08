import User from "models/user";
import { managerRoleCheck } from "utils/user-helpers";

export default async (req, res, next) => {
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

  const check = managerRoleCheck(user.roles || []);

  // Check if user has an admin or manager role
  const hasPermission = user.isAdmin || check > 0;

  if (!hasPermission) {
    return res
      .status(403)
      .json({ message: "You cannot access this information" });
  }

  req.user = {
    ...req.user,
    userId: user._id,
    roles: user.roles || [],
    isAdmin: user.isAdmin || false,
  };
  next();
};
