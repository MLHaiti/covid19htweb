export const removeKeys = (input) => {
  const data = { ...input };
  delete data.password;
  delete data.email;

  return data;
};
