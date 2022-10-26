import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getDemandeDepenseModel = () => {
  return ConnexionBd.getSequelizeDb().models.Demande_depense;
};
const messageDemandeDepenseNotFound = "Cette demande de dépense n'éxiste pas.";

//TODO CREATE DEMANDE_DEPENSE
const createDemandeDepense = async (req: Request, res: Response) => {
  try {
    const dataDemandeDepense = await getDemandeDepenseModel().create({
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
    const dataDemandeDepenses = await getDemandeDepenseModel().findAll();
    return res.json(dataDemandeDepenses);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET DEMANDE_DEPENSE BY ID
const getDemandeDepenseById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataDemandeDepense = await getDemandeDepenseModel().findByPk(id);

    if (!dataDemandeDepense) {
      return res.json({ message: messageDemandeDepenseNotFound });
    }
    //vrf OWNER
    const employerOwnerDmdDepense: string =
      dataDemandeDepense.getDataValue("EmployeId");
    routesHelpers.vrfUserOwner(req, employerOwnerDmdDepense);
    //

    return res.json(dataDemandeDepense);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE DEMANDE_DEPENSE BY ID
const updateDemandeDepenseById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataDemandeDepense = await getDemandeDepenseModel().findByPk(id);
    if (!dataDemandeDepense) {
      return res.json({ message: messageDemandeDepenseNotFound });
    }

    //vrf OWNER
    const employerOwnerDmdDepense: string =
      dataDemandeDepense.getDataValue("EmployeId");
    routesHelpers.vrfUserOwner(req, employerOwnerDmdDepense);
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
  const id = routesHelpers.getParamId(req);
  try {
    const dataDemandeDepense = await getDemandeDepenseModel().findByPk(id);
    if (!dataDemandeDepense) {
      return res.json({ message: messageDemandeDepenseNotFound });
    }

    //vrf OWNER
    const employerOwnerDmdDepense: string =
      dataDemandeDepense.getDataValue("EmployeId");
    routesHelpers.vrfUserOwner(req, employerOwnerDmdDepense);
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
    await getDemandeDepenseModel().drop();
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
