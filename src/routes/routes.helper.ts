import { Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "process";
import ConnexionBd from "../connexionBd/connexionBd";
const roundSalt = 10;

/**********************************HELPER FUNCTIONS************************************* */
//TODO GET PARAM ID
const getParamId = (req: Request): string | null => {
  const id = req.params.id;
  /**
   *
   * PAS DE TRAITEMENT DU PARAM ID POUR L'INSTANT
   */

  return id ? id : null;
};
//TODO GET PARAM EMAIL
const getParamEmail = (req: Request): string | null => {
  const email = req.params.email;
  /**
   *
   * PAS DE TRAITEMENT DU PARAM EMAIL POUR L'INSTANT
   */

  return email ? email : null;
};
//TODO VRF USEROWNER
const vrfUserOwner = async (
  req: Request,
  idUserOwnerRessouce: string,
  authorizationAdmin: boolean
): Promise<void> => {
  /*
  const token = req.headers.authorization.split(" ")[1];
  const tokenVerify: any = jwt.verify(token, env.SECRET_KEY, {
    audience: "MOBILE APP",
    algorithms: ["HS384"],
  });

  //INFO USER_TOKEN
  const userIdToken = tokenVerify.userIdAuth;
  const userRoleToken = tokenVerify.userRoleAuth;

  //  TRAITEMENT VRF SI ADMIN EST AUTORISER A EFFECTUER CETTE ACTION
  if (authorizationAdmin) {
    if (userIdToken != idUserOwnerRessouce && userRoleToken != "admin") {
      const errorUserOwner = new Error();
      errorUserOwner.name = "Forbidden";
      errorUserOwner.message =
        "[*Forbidden*] Vous n'ête pas autorisé a éffectué cette action .";
      throw errorUserOwner;
    }
  } else {
    if (userIdToken != idUserOwnerRessouce) {
      const errorUserOwner = new Error();
      errorUserOwner.name = "Forbidden";
      errorUserOwner.message =
        "[*Forbidden*] Vous n'ête pas autorisé a éffectué cette action .";
      throw errorUserOwner;
    }
  }
  */
};
//TODO VRF EMAIL ADMIN
const vrfEmailAdmin = async (req: Request): Promise<void> => {
  const email: string = req.body.email;

  //VRF_EMAIL
  if (!email) {
    const errorPwd = new Error();
    errorPwd.name = "NotFoundEmail";
    errorPwd.message = "L'email est requise";
    throw errorPwd;
  }

  //  TRAITEMENT EMAIL
  if (!email.startsWith("#")) {
    const errorPwd = new Error();
    errorPwd.name = "InvalidEmail";
    errorPwd.message =
      "L'email de l'administrateur doit étre précédé de #. \n Exp : #firstadmin@gmail.com";
    throw errorPwd;
  }
};
//TODO GET PWD HASH
const getHashPwd = async (req: Request): Promise<string> => {
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
  const salt = await bcrypt.genSalt(roundSalt);
  const pwdHash = await bcrypt.hash(pwd, salt);

  return pwdHash;
};
const pwdIsValid = (pwd: string): boolean => {
  const regIncludeLettreMini = new RegExp("[a-z]+", "g");
  const regIncludeLettreMaju = new RegExp("[A-Z]+", "g");
  const regIncludeChiffre = new RegExp("[0-9]+", "g");

  const message: string = "Votre mot de passe doit avoir au moins";
  const errorPwd = new Error();
  errorPwd.name = "InvalidePwd";

  //VRF
  if (pwd.length < 6) {
    errorPwd.message = message + " six(6) caractères";
    throw errorPwd;
  } else if (!regIncludeLettreMini.test(pwd)) {
    errorPwd.message = message + " une lettre minuscule";
    throw errorPwd;
  } else if (!regIncludeLettreMaju.test(pwd)) {
    errorPwd.message = message + " une lettre majuscule";
    throw errorPwd;
  } else if (!regIncludeChiffre.test(pwd)) {
    errorPwd.message = message + " un chiffre";
    throw errorPwd;
  } else {
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

export default routesHelpers;
