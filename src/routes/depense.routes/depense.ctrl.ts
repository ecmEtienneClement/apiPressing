import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import { NameModelsListe } from "../../models/namingModelListe";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getModels = () => {
  return ConnexionBd.modelsList.get(NameModelsListe.depense);
};
const messageDepenseNotFound = "Cette dépense n'éxiste pas.";

//TODO CREATE DEPENSE
const createDepense = async (req: Request, res: Response) => {
  try {
    const dataDepense = await getModels().create({
      ...req.body,
    });
    return res.status(201).json(dataDepense);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET ALL DEPENSES
const getAllDepenses = async (req: Request, res: Response) => {
  try {
    //
    const dataDepenses = await getModels().findAll({
      include: { all: true },
    });
    //
    return res.json(dataDepenses);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE DEPENSE BY ID
const deleteDepenseById = async (req: Request, res: Response) => {
  try {
    const id = routesHelpers.getParamId(req);

    const dataDepense = await getModels().findByPk(id);
    if (!dataDepense) {
      return res.status(404).json({ message: messageDepenseNotFound });
    }

    await dataDepense.destroy();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE ALL DEPENSES
const deleteAllDepenses = async (req: Request, res: Response) => {
  try {
    await getModels().drop();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//DATA ROUTES EXPORTED
const depensesCtrl = {
  createDepense,
  getAllDepenses,
  deleteDepenseById,
  deleteAllDepenses,
};

export default depensesCtrl;
