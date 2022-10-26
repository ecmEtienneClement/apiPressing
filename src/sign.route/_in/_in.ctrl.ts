import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ConnexionBd from "../../connexionBd/connexionBd";
import dotenv from "dotenv";
import { env } from "process";
import routesErrors from "../../routes/routes.errors";
dotenv.config();
//
const getEmployerModel = () => {
  return ConnexionBd.getSequelizeDb().models.Employe;
};
const getAdminModel = () => {
  return ConnexionBd.getSequelizeDb().models.Admin;
};

const messageAdminNotFound = "Cet administrateur n'éxiste pas.";
const messageEmployerNotFound = "Cet employé n'éxiste pas.";

//TODO SIGN_IN
export default async (req: Request, res: Response) => {
  //
  const email: string = req.body.email;
  const pwd: string = req.body.mdp;
  const isAdmin = email.startsWith("#");
  //
  const modelAdminOrEmployer = isAdmin ? getAdminModel() : getEmployerModel();
  const messageUserNotFound = isAdmin
    ? messageAdminNotFound
    : messageEmployerNotFound;
  //
  try {
    const dataEmployerOrAdmin = await modelAdminOrEmployer.findOne({
      where: { email },
    });
    //
    if (!dataEmployerOrAdmin) {
      return res.json({ message: messageUserNotFound });
    }
    //
    const isGood = await bcrypt.compare(
      pwd,
      dataEmployerOrAdmin.getDataValue("mdp")
    );
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
      token: jwt.sign(
        {
          userIdAuth,
          userEmailAuth,
          userRoleAuth,
          userIpAuth,
          userUserAgentAuth,
        },
        env.SECRET_KEY,
        {
          expiresIn: "5h",
          audience: "MOBILE APP",
          algorithm: "HS384",
        }
      ),
    });

    //
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};
