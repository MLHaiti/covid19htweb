import { serializeCookie } from "utils/auth";

// TODO make sure to send bad request for other types
export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = await req.body;
    try {
      if (!email || !password) {
        throw new Error("Email and password must be provided.");
      }
      const cookieSerialized = serializeCookie("dev");
      res.setHeader("Set-Cookie", cookieSerialized);
      return res.json({ ok: true });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  res.status(400).send({ message: "Post only" });
};
