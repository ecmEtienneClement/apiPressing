"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connexionBd_1 = __importDefault(require("../../connexionBd/connexionBd"));
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = require("process");
const routes_errors_1 = __importDefault(require("../../routes/routes.errors"));
dotenv_1.default.config();
//
const getEmployerModel = () => {
    return connexionBd_1.default.getSequelizeDb().models.Employe;
};
const getAdminModel = () => {
    return connexionBd_1.default.getSequelizeDb().models.Admin;
};
const messageAdminNotFound = "Cet administrateur n'éxiste pas.";
const messageEmployerNotFound = "Cet employé n'éxiste pas.";
//TODO SIGN_IN
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const email = req.body.email;
    const pwd = req.body.mdp;
    const isAdmin = email.startsWith("#");
    //
    const modelAdminOrEmployer = isAdmin ? getAdminModel() : getEmployerModel();
    const messageUserNotFound = isAdmin
        ? messageAdminNotFound
        : messageEmployerNotFound;
    //
    try {
        const dataEmployerOrAdmin = yield modelAdminOrEmployer.findOne({
            where: { email },
        });
        //
        if (!dataEmployerOrAdmin) {
            return res.json({ message: messageUserNotFound });
        }
        //
        const isGood = yield bcrypt_1.default.compare(pwd, dataEmployerOrAdmin.getDataValue("mdp"));
        //
        if (!isGood) {
            return res.json({ message: "Email ou mot de passe incorrect" });
        }
        const userIdAuth = dataEmployerOrAdmin.getDataValue("id");
        const userEmailAuth = dataEmployerOrAdmin.getDataValue("email");
        const userNomAuth = dataEmployerOrAdmin.getDataValue("nom");
        const userPrenomAuth = dataEmployerOrAdmin.getDataValue("prenom");
        const userRoleAuth = dataEmployerOrAdmin.getDataValue("role");
        const userIpAuth = req.ip;
        const userUserAgentAuth = req.headers["user-agent"];
        res.json({
            userIdAuth,
            userEmailAuth,
            userNomAuth,
            userPrenomAuth,
            userRoleAuth,
            userIpAuth,
            userUserAgentAuth,
            token: jsonwebtoken_1.default.sign({
                userIdAuth,
                userEmailAuth,
                userRoleAuth,
                userIpAuth,
                userUserAgentAuth,
            }, process_1.env.SECRET_KEY, {
                expiresIn: "5h",
                audience: "MOBILE APP",
                algorithm: "HS384",
            }),
        });
        //
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});