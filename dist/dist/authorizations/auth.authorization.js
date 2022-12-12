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
        const userIpReq = req.ip;
        const userUserAgentReq = req.headers["user-agent"];
        //VR TOKEN AND URL
        if (userIdToken != userIdReq ||
            userEmailToken != userEmailReq ||
            userRoleToken != userRoleReq ||
            userIpToken != userIpReq ||
            userUserAgentToken != userUserAgentReq) {
            throw new Error();
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(403).json({
            message: "Token invalide veillez générer un nouveau token.",
        });
    }
};
