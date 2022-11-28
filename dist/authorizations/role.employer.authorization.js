"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//TODO
exports.default = (req, res, next) => {
    try {
        next();
        /*
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
        */
    }
    catch (error) {
        res.status(403).json({
            message: "[*Forbidden*] Vous n'ête pas autorisé a éffectué cette action .",
        });
    }
};
