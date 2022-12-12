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
const process_1 = require("process");
const roundSalt = 10;
/**********************************HELPER FUNCTIONS************************************* */
//TODO GET PARAM ID
const getParamId = (req) => {
    const id = req.params.id;
    /**
     *
     * PAS DE TRAITEMENT DU PARAM ID POUR L'INSTANT
     */
    return id ? id : null;
};
//TODO GET PARAM EMAIL
const getParamEmail = (req) => {
    const email = req.params.em;
    /**
     *
     * PAS DE TRAITEMENT DU PARAM EMAIL POUR L'INSTANT
     */
    return email ? email : null;
};
//TODO VRF USEROWNER
const vrfUserOwner = (req, idUserOwnerRessouce, authorizationAdmin) => {
    const token = req.headers.authorization.split(" ")[1];
    const tokenVerify = jsonwebtoken_1.default.verify(token, process_1.env.SECRET_KEY, {
        audience: "MOBILE APP",
        algorithms: ["HS384"],
    });
    //INFO USER_TOKEN
    const userIdToken = tokenVerify.userIdAuth;
    const userRoleToken = tokenVerify.userRoleAuth;
    //  TRAITEMENT VRF SI ADMIN EST AUTORISER A EFFECTUER CETTE ACTION
    if (authorizationAdmin) {
        if (userIdToken != idUserOwnerRessouce && userRoleToken != "admin") {
            let errorUserOwner = new Error();
            errorUserOwner.name = "Forbidden";
            errorUserOwner.message =
                "[*Forbidden*] Vous n'ête pas autorisé a éffectué cette action .";
            throw errorUserOwner;
        }
    }
    else {
        if (userIdToken != idUserOwnerRessouce) {
            let errorUserOwner = new Error();
            errorUserOwner.name = "Forbidden";
            errorUserOwner.message =
                "[*Forbidden*] Vous n'ête pas autorisé a éffectué cette action .";
            throw errorUserOwner;
        }
    }
};
//TODO VRF EMAIL ADMIN
const vrfEmailAdmin = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    //VRF_EMAIL
    if (!email) {
        const errorEmail = new Error();
        errorEmail.name = "NotFoundEmail";
        errorEmail.message = "L'email est requise";
        throw errorEmail;
    }
    //  TRAITEMENT EMAIL
    if (!email.startsWith("#")) {
        const errorEmail = new Error();
        errorEmail.name = "InvalidEmail";
        errorEmail.message =
            "L'email de l'administrateur doit étre précédé de #. \n Exp : #firstadmin@gmail.com";
        throw errorEmail;
    }
});
//TODO GET PWD HASH
const getHashPwd = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const pwd = req.body.mdp;
    //VRF_MDP
    if (!pwd) {
        const errorPwd = new Error();
        errorPwd.name = "NotFoundPwd";
        errorPwd.message = "Le mot de passe est requise";
        throw errorPwd;
    }
    //  TRAITEMENT DU MDP
    if (!pwdIsValid(pwd)) {
        return;
    }
    //HASH
    const salt = yield bcrypt_1.default.genSalt(roundSalt);
    const pwdHash = yield bcrypt_1.default.hash(pwd, salt);
    return pwdHash;
});
const pwdIsValid = (pwd) => {
    const regIncludeLettreMini = new RegExp("[a-z]+", "g");
    const regIncludeLettreMaju = new RegExp("[A-Z]+", "g");
    const regIncludeChiffre = new RegExp("[0-9]+", "g");
    const message = "Votre mot de passe doit avoir au moins";
    const errorPwd = new Error();
    errorPwd.name = "InvalidePwd";
    //VRF
    if (pwd.length < 6) {
        errorPwd.message = message + " six(6) caractères";
        throw errorPwd;
    }
    else if (!regIncludeLettreMini.test(pwd)) {
        errorPwd.message = message + " une lettre minuscule";
        throw errorPwd;
    }
    else if (!regIncludeLettreMaju.test(pwd)) {
        errorPwd.message = message + " une lettre majuscule";
        throw errorPwd;
    }
    else if (!regIncludeChiffre.test(pwd)) {
        errorPwd.message = message + " un chiffre";
        throw errorPwd;
    }
    else {
        return true;
    }
};
/**********************************HELPER EXPORTED************************************* */
//TODO
//DATA ROUTE HELPER EXPORT
const routesHelpers = {
    getParamId,
    getParamEmail,
    getHashPwd,
    vrfEmailAdmin,
    vrfUserOwner,
};
exports.default = routesHelpers;
