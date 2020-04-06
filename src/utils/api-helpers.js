import User from "models/user";

/* eslint-disable import/prefer-default-export */
// take only needed user fields to avoid sensitive ones (such as password)
export function extractUser(user) {
  if (!user) return null;
  const { name, email, bio, profilePicture, emailVerified } = user;
  return {
    name,
    email,
    bio,
    profilePicture,
    emailVerified,
  };
}

/**
 *
 * @param {String} input Remove possible sensitive data
 */
export const removeKeys = (input) => {
  const data = { ...input };
  delete data.password;
  delete data.email;

  return data;
};

export async function getUser(email) {
  try {
    const user = await User.findOne({ email });
    return [user, false];
  } catch (error) {
    return [null, true];
  }
}
