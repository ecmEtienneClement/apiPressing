import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import { NameModelsListe } from "../../models/namingModelListe";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getModels = () => {
  return ConnexionBd.modelsList.get(NameModelsListe.cmpBloquer);
};
const messageCompteBloquerNotFound = "Cet [compte_bloquer] n'éxiste pas.";

//TODO CREATE COMPTE_BLOQUER
const createCompteBloquer = async (req: Request, res: Response) => {
  try {
    const dataCompteBloquer = await getModels().create({
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
    //
    const dataCompteBloquer = await getModels().findAll({
      include: { all: true },
    });
    //
    return res.json(dataCompteBloquer);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET COMPTE_BLOQUER BY EMAIL
const getCompteBloquerByEmail = async (req: Request, res: Response) => {
  try {
    const email = routesHelpers.getParamEmail(req);

    const dataCompteBloquer = await getModels().findOne({
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
  try {
    const id = routesHelpers.getParamId(req);

    const dataCompteBloquer = await getModels().findByPk(id);
    if (!dataCompteBloquer) {
      return res.status(404).json({ message: messageCompteBloquerNotFound });
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
