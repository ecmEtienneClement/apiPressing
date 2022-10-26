import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getCompteBloqueModel = () => {
  return ConnexionBd.getSequelizeDb().models.Compte_bloquer;
};
const messageCompteBloquerNotFound = "Cet [compte_bloquer] n'éxiste pas.";

//TODO CREATE COMPTE_BLOQUER
const createCompteBloquer = async (req: Request, res: Response) => {
  try {
    const dataCompteBloquer = await getCompteBloqueModel().create({
      ...req.body,
    });
    return res.status(201).json(dataCompteBloquer);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET ALL COMPTE_BLOQUERS
const getAllCompteBloquer = async (req: Request, res: Response) => {
  try {
    const dataCompteBloquer = await getCompteBloqueModel().findAll();
    return res.json(dataCompteBloquer);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET COMPTE_BLOQUER BY EMAIL
const getCompteBloquerByEmail = async (req: Request, res: Response) => {
  const email = routesHelpers.getParamEmail(req);
  try {
    const dataCompteBloquer = await getCompteBloqueModel().findOne({
      where: {
        email: email,
      },
    });
    if (dataCompteBloquer) {
      if (dataCompteBloquer.getDataValue("byAdmin")) {
        return res.json({
          looked: true,
          byAdmin: true,
        });
      } else {
        return res.json({
          looked: true,
          byAdmin: false,
        });
      }
    } else {
      return res.json(false);
    }
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE COMPTE_BLOQUER BY ID
const deleteCompteBloquerById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataCompteBloquer = await getCompteBloqueModel().findByPk(id);
    if (!dataCompteBloquer) {
      return res.json({ message: messageCompteBloquerNotFound });
    }

    await dataCompteBloquer.destroy();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//DATA ROUTES EXPORTED
const compteBloquerCtrl = {
  createCompteBloquer,
  getAllCompteBloquer,
  getCompteBloquerByEmail,
  deleteCompteBloquerById,
};

export default compteBloquerCtrl;
