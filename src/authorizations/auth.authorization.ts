import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";

//TODO
export default (req: Request, res: Response, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const tokenVerify: any = jwt.verify(token, env.SECRET_KEY, {
      audience: "MOBILE APP",
      algorithms: ["HS384"],
    });

    //INFO TOKEN
    const userIdToken = tokenVerify.userIdAuth;
    const userEmailToken = tokenVerify.userEmailAuth;
    const userRoleToken = tokenVerify.userRoleAuth;
    const userIpToken = tokenVerify.userIpAuth;
    const userUserAgentToken = tokenVerify.userUserAgentAuth;

    //INFO URL
    const userIdReq = req.query.id;
    const userEmailReq = req.query.em;
    const userRoleReq = req.query.rl;
    const userIpReq = req.query.ip;
    const userUserAgentReq = req.query.ua;
    //VR TOKEN AND URL
    if (
      userIdToken != userIdReq ||
      userEmailToken != userEmailReq ||
      userRoleToken != userRoleReq ||
      userIpToken != userIpReq ||
      userUserAgentToken != userUserAgentReq
    ) {
      throw new Error();
    } else {
      next();
    }
  } catch (error) {
    res.status(403).json({
      message: "Token invalide veillez générer un nouveau token.",
    });
  }
};