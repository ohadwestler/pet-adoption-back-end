import sign from "jsonwebtoken/sign.js";
import verify from "jsonwebtoken/verify.js";
import dotenv from 'dotenv';

dotenv.config()

export function createTokens(user) {
  const accessToken = sign(
    { email: user.email },
    process.env.SECRETKEY,
    {algorithm: "HS256", expiresIn: 300000 }
  );

  return accessToken;
}

export function validateToken(req, res, next) {
  const accessToken = req.cookies[process.env.TOKENKEY];

  if (!accessToken) {
    return res.status(400).json({ message: "Token is expired, please reconnect!" });
  }

  try {
    const validToken = verify(accessToken, process.env.SECRETKEY);
    if (validToken) {
      req.body.loginEmail = validToken.email;
      req.params.loginEmail = validToken.email;
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Token is expired, please reconnect!" });
  }
}
