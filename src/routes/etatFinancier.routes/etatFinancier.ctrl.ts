import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import { NameModelsListe } from "../../models/namingModelListe";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getModels = () => {
  return ConnexionBd.modelsList.get(NameModelsListe.etatFinancier);
};
const messageEtatFinancierNotFound = "Cet état financier n'éxiste pas.";

//TODO CREATE ETAT_FINANCIER
const createEtatFinancier = async (req: Request, res: Response) => {
  try {
    const dataEtatFinancierModel = await getModels().create({
      ...req.body,
    });
    return res.status(201).json(dataEtatFinancierModel);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET ETAT_FINANCIER
const getEtatFinancier = async (req: Request, res: Response) => {
  try {
    const dataEtatFinancierModel = await getModels().findAll({
      limit: 1,
    });
    return res.json(dataEtatFinancierModel);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE ETAT_FINANCIER BY ID
const updateEtatFinancierById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataEtatFinancierModel = await getModels().findByPk(id);
    if (!dataEtatFinancierModel) {
      return res.status(404).json({ message: messageEtatFinancierNotFound });
    }

    const etatFinancierUpdated = await dataEtatFinancierModel.update(
      { ...req.body },
      { where: { id: id } }
    );
    return res.json(etatFinancierUpdated);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE  ETAT_FINANCIER
const deleteEtatFinancier = async (req: Request, res: Response) => {
  try {
    await getModels().drop();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//DATA ROUTES EXPORTED
const etatFinancierCtrl = {
  createEtatFinancier,
  getEtatFinancier,
  updateEtatFinancierById,
  deleteEtatFinancier,
};

export default etatFinancierCtrl;
