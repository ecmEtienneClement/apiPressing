"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = require("process");
//TODO
exports.default = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const tokenVerify = jsonwebtoken_1.default.verify(token, process_1.env.SECRET_KEY, {
            audience: "MOBILE APP",
            algorithms: ["HS384"],
        });
        //DATA TOKEN
        const userRoleToken = tokenVerify.userRoleAuth;
        //VR ROLE
        if (userRoleToken !== "employer") {
            throw new Error();
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(403).json({
            message: "[*Forbidden*] Vous n'ête pas autorisé a éffectué cette action .",
        });
    }
};
