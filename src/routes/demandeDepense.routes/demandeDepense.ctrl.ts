import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import { NameModelsListe } from "../../models/namingModelListe";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getModels = () => {
  return ConnexionBd.modelsList.get(NameModelsListe.dmdDepense);
};
const messageDemandeDepenseNotFound = "Cette demande de dépense n'éxiste pas.";

//TODO CREATE DEMANDE_DEPENSE
const createDemandeDepense = async (req: Request, res: Response) => {
  try {
    const dataDemandeDepense = await getModels().create({
      ...req.body,
    });
    return res.status(201).json(dataDemandeDepense);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET ALL DEMANDE_DEPENSES
const getAllDemandeDepenses = async (req: Request, res: Response) => {
  try {
    //
    const dataDemandeDepenses = await getModels().findAll({
      include: { all: true },
    });
    //
    return res.json(dataDemandeDepenses);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET DEMANDE_DEPENSE BY ID
const getDemandeDepenseById = async (req: Request, res: Response) => {
  try {
    const id = routesHelpers.getParamId(req);
    //
    const dataDemandeDepense = await getModels().findByPk(id, {
      include: { all: true },
    });
    //
    if (!dataDemandeDepense) {
      return res.status(404).json({ message: messageDemandeDepenseNotFound });
    }
    //vrf OWNER
    const employerOwnerDmdDepense: string =
      dataDemandeDepense.getDataValue("EmployeId");
    routesHelpers.vrfUserOwner(req, employerOwnerDmdDepense, true);
    //

    return res.json(dataDemandeDepense);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE DEMANDE_DEPENSE BY ID
const updateDemandeDepenseById = async (req: Request, res: Response) => {
  try {
    const id = routesHelpers.getParamId(req);

    const dataDemandeDepense = await getModels().findByPk(id);
    if (!dataDemandeDepense) {
      return res.status(404).json({ message: messageDemandeDepenseNotFound });
    }

    //vrf OWNER
    const employerOwnerDmdDepense: string =
      dataDemandeDepense.getDataValue("EmployeId");
    routesHelpers.vrfUserOwner(req, employerOwnerDmdDepense, false);
    //

    const DemandeDepenseUpdated = await dataDemandeDepense.update(
      { ...req.body },
      { where: { id: id } }
    );
    return res.json(DemandeDepenseUpdated);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE DEMANDE_DEPENSE BY ID
const deleteDemandeDepenseById = async (req: Request, res: Response) => {
  try {
    const id = routesHelpers.getParamId(req);
    const dataDemandeDepense = await getModels().findByPk(id);
    if (!dataDemandeDepense) {
      return res.status(404).json({ message: messageDemandeDepenseNotFound });
    }
    //vrf OWNER
    const employerOwnerDmdDepense: string =
      dataDemandeDepense.getDataValue("EmployeId");
    routesHelpers.vrfUserOwner(req, employerOwnerDmdDepense, false);
    //
    await dataDemandeDepense.destroy();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE ALL DEMANDE_DEPENSES
const deleteAllDemandeDepenses = async (req: Request, res: Response) => {
  try {
    await getModels().drop();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//DATA ROUTES EXPORTED
const demandeDepensesCtrl = {
  createDemandeDepense,
  getAllDemandeDepenses,
  getDemandeDepenseById,
  updateDemandeDepenseById,
  deleteDemandeDepenseById,
  deleteAllDemandeDepenses,
};

export default demandeDepensesCtrl;
