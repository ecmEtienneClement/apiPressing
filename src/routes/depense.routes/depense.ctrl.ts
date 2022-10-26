import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getDepenseModel = () => {
  return ConnexionBd.getSequelizeDb().models.Depense;
};
const messageDepenseNotFound = "Cette dépense n'éxiste pas.";

//TODO CREATE DEPENSE
const createDepense = async (req: Request, res: Response) => {
  try {
    const dataDepense = await getDepenseModel().create({
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
    const dataDepenses = await getDepenseModel().findAll();
    return res.json(dataDepenses);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE DEPENSE BY ID
const deleteDepenseById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataDepense = await getDepenseModel().findByPk(id);
    if (!dataDepense) {
      return res.json({ message: messageDepenseNotFound });
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
    await getDepenseModel().drop();
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
