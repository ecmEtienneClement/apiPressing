import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import { NameModelsListe } from "../../models/namingModelListe";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";
//
const getModels = () => {
  return ConnexionBd.modelsList.get(NameModelsListe.admin);
};
const messageAdminNotFound = "Cet administrateur n'éxiste pas.";

//TODO CREATE ADMIN
const createAdmin = async (req: Request, res: Response) => {
  try {
    await routesHelpers.vrfEmailAdmin(req);
    const pwdHash = await routesHelpers.getHashPwd(req);
    const dataAdmin = await getModels().create({
      ...req.body,
      mdp: pwdHash,
    });
    return res.status(201).json(dataAdmin);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET ALL ADMINS
const getAllAdmins = async (req: Request, res: Response) => {
  try {
    //
    const dataAdmins = await getModels().findAll({
      include: { all: true },
    });
    //
    return res.json(dataAdmins);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET ADMIN BY ID
const getAdminById = async (req: Request, res: Response) => {
  try {
    const id = routesHelpers.getParamId(req);
    //
    const dataAdmin = await getModels().findByPk(id, {
      include: { all: true },
    });
    return dataAdmin
      ? res.json(dataAdmin)
      : res.status(404).json({ message: messageAdminNotFound });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE ADMIN BY ID
const updateAdminById = async (req: Request, res: Response) => {
  try {
    const id = routesHelpers.getParamId(req);

    const dataAdmin = await getModels().findByPk(id);
    if (!dataAdmin) {
      return res.status(404).json({ message: messageAdminNotFound });
    }

    //vrf OWNER
    const idAdminOwnerData: string = dataAdmin.getDataValue("id");
    routesHelpers.vrfUserOwner(req, idAdminOwnerData, false);
    //
    await dataAdmin.update({ ...req.body }, { where: { id: id } });
    return getAdminById(req, res);
  } catch (error) { 
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE ADMIN BY ID
const deleteAdminById = async (req: Request, res: Response) => {
  try {
    const id = routesHelpers.getParamId(req);

    const dataAdmin = await getModels().findByPk(id);
    if (!dataAdmin) {
      return res.status(404).json({ message: messageAdminNotFound });
    }
    //vrf OWNER
    const idAdminOwnerData: string = dataAdmin.getDataValue("id");
    routesHelpers.vrfUserOwner(req, idAdminOwnerData, false);
    //
    await dataAdmin.destroy();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE ALL ADMINS
const deleteAllAdmins = async (req: Request, res: Response) => {
  try {
    await getModels().drop();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//DATA ROUTES EXPORTED
const adminsCtrl = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  deleteAllAdmins,
};

export default adminsCtrl;
