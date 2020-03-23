export default {
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://jobopwa.now.sh"
      : "http://localhost:3000",
};
