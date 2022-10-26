import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getFactureModel = () => {
  return ConnexionBd.getSequelizeDb().models.Facture;
};
const messageFactureNotFound = "Cette facture n'éxiste pas.";

//TODO CREATE FACTURE
const createFacture = async (req: Request, res: Response) => {
  try {
    const dataFacture = await getFactureModel().create({ ...req.body });
    return res.status(201).json(dataFacture);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET ALL FACTURES
const getAllFactures = async (req: Request, res: Response) => {
  try {
    const dataFactures = await getFactureModel().findAll();
    return res.json(dataFactures);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET FACTURE BY ID
const getFactureById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataFacture = await getFactureModel().findByPk(id);
    return dataFacture
      ? res.json(dataFacture)
      : res.json({ message: messageFactureNotFound });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE FACTURE BY ID
const updateFactureById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataFacture = await getFactureModel().findByPk(id);
    if (!dataFacture) {
      return res.json({ message: messageFactureNotFound });
    }

    const factureUpdated = await dataFacture.update(
      { ...req.body },
      { where: { id: id } }
    );
    return res.json(factureUpdated);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE FACTURE BY ID
const deleteFactureById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataFacture = await getFactureModel().findByPk(id);
    if (!dataFacture) {
      return res.json({ message: messageFactureNotFound });
    }

    await dataFacture.destroy();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE ALL FACTURES
const deleteAllFactures = async (req: Request, res: Response) => {
  try {
    await getFactureModel().drop();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//DATA ROUTES EXPORTED
const facturesCtrl = {
  createFacture,
  getAllFactures,
  getFactureById,
  updateFactureById,
  deleteFactureById,
  deleteAllFactures,
};

export default facturesCtrl;
