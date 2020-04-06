import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;
const expirationTime = 60 * 60 * 24; // 24 hours

export default (req, res) => {
  const { email } = req.user;

  const code = 42;

  const data = { email, code };

  const token = jwt.sign(data, jwtSecret, {
    expiresIn: expirationTime, // 50 minutes
  });

  res.json({ token });
};
// import crypto from "crypto";
// import sgMail from "@sendgrid/mail";
// import nextConnect from "next-connect";
// import middleware from "middlewares/middleware";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const handler = nextConnect();

// handler.use(middleware);

// handler.post(async (req, res) => {
//   if (!req.user) {
//     res.json(401).send("you need to be authenticated");
//     return;
//   }
//   const token = crypto.randomBytes(32).toString("hex");
//   await req.db.collection("tokens").insertOne({
//     token,
//     userId: req.user._id,
//     type: "emailVerify",
//     expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
//   });
//   const msg = {
//     to: req.user.email,
//     from: process.env.EMAIL_FROM,
//     html: `
//       <div>
//         <p>Hello, ${req.user.name}</p>
//         <p>Please follow <a href="${process.env.WEB_URI}/verify-email/${token}">this link</a> to confirm your email.</p>
//       </div>
//       `,
//   };
//   await sgMail.send(msg);
//   res.end("ok");
// });

// export default handler;
