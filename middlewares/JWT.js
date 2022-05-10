import sign from "jsonwebtoken/sign.js";
import verify from "jsonwebtoken/verify.js";
import dotenv from 'dotenv';

dotenv.config()

export function createTokens(user) {
  const accessToken = sign(
    { password: user.password, email: user.email },
    process.env.SECRETKEY,
    { expiresIn: 3000 }
  );

  return accessToken;
}

export function validateToken(req, res, next) {
  const accessToken = req.cookies[process.env.TOKENKEY];

  if (!accessToken)
    return res.status(400).json({ message: "Token is expired, please reconnect!" });

  try {
    const validToken = verify(accessToken, process.env.SECRETKEY);
    req.body.loginEmail =  validToken.email
    req.params.loginEmail = validToken.email
    
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ message: "Token is expired, please reconnect!" });
  }
}
