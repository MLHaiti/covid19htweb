import nextConnect from "next-connect";
import session from "middlewares/session";

const handler = nextConnect();

handler.use(session);

/**
 * We will use this route to send public informatin to the front-end about the user
 */
handler.get((req, res) => {
  res.json({ user: req.user });
});

export default handler;
