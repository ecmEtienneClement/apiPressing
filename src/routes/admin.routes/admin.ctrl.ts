import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";
//
const getAdminModel = () => {
  return ConnexionBd.getSequelizeDb().models.Admin;
};
const messageAdminNotFound = "Cet administrateur n'éxiste pas.";

//TODO CREATE ADMIN
const createAdmin = async (req: Request, res: Response) => {
  try {
    await routesHelpers.vrfEmailAdmin(req);
    const pwdHash = await routesHelpers.getHashPwd(req);
    const dataAdmin = await getAdminModel().create({
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
    const dataAdmins = await getAdminModel().findAll();
    return res.json(dataAdmins);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET ADMIN BY ID
const getAdminById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataAdmin = await getAdminModel().findByPk(id);
    return dataAdmin
      ? res.json(dataAdmin)
      : res.json({ message: messageAdminNotFound });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE ADMIN BY ID
const updateAdminById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataAdmin = await getAdminModel().findByPk(id);
    if (!dataAdmin) {
      return res.json({ message: messageAdminNotFound });
    }

    const adminUpdated = await dataAdmin.update(
      { ...req.body },
      { where: { id: id } }
    );
    return res.json(adminUpdated);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE ADMIN BY ID
const deleteAdminById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataAdmin = await getAdminModel().findByPk(id);
    if (!dataAdmin) {
      return res.json({ message: messageAdminNotFound });
    }

    await dataAdmin.destroy();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE ALL ADMINS
const deleteAllAdmins = async (req: Request, res: Response) => {
  try {
    await getAdminModel().drop();
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
