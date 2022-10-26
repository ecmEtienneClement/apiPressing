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
    //DATA TOKEN
    const userRoleToken = tokenVerify.userRoleAuth;

    //VR ROLE
    if (userRoleToken !== "employer") {
      throw new Error();
    } else {
      next();
    }
  } catch (error) {
    res.status(403).json({
      message:
        "[*Forbidden*] Vous n'ête pas autorisé a éffectué cette action .",
    });
  }
};
