import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import { NameModelsListe } from "../../models/namingModelListe";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getModels = () => {
  return ConnexionBd.modelsList.get(NameModelsListe.facture);
};
const messageFactureNotFound = "Cette facture n'éxiste pas.";

//TODO CREATE FACTURE
const createFacture = async (req: Request, res: Response) => {
  try {
    const dataFacture = await getModels().create({
      ...req.body,
    });
    return res.status(201).json(dataFacture);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET ALL FACTURES
const getAllFactures = async (req: Request, res: Response) => {
  try {
    //
    const dataFactures = await getModels().findAll({
      include: { all: true },
    });
    //
    return res.json(dataFactures);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET FACTURE BY ID
const getFactureById = async (req: Request, res: Response) => {
  try {
    const id = routesHelpers.getParamId(req);
    //
    const dataFacture = await getModels().findByPk(id, {
      include: { all: true },
    });
    //
    return dataFacture
      ? res.json(dataFacture)
      : res.status(404).json({ message: messageFactureNotFound });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE FACTURE BY ID
const updateFactureById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataFacture = await getModels().findByPk(id);
    if (!dataFacture) {
      return res.status(404).json({ message: messageFactureNotFound });
    }

    await dataFacture.update({ ...req.body }, { where: { id: id } });
    return getFactureById(req, res);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE FACTURE BY ID
const deleteFactureById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataFacture = await getModels().findByPk(id);
    if (!dataFacture) {
      return res.status(404).json({ message: messageFactureNotFound });
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
    await getModels().drop();
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
