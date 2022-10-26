import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getEmployerModel = () => {
  return ConnexionBd.getSequelizeDb().models.Employe;
};
const messageEmployerNotFound = "Cet employé n'éxiste pas.";

//TODO CREATE EMPLOYER
const createEmployer = async (req: Request, res: Response) => {
  try {
    const pwdHash = await routesHelpers.getHashPwd(req);
    const dataEmployer = await getEmployerModel().create({
      ...req.body,
      mdp: pwdHash,
    });
    return res.status(201).json(dataEmployer);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET ALL EMPLOYERS
const getAllEmployers = async (req: Request, res: Response) => {
  try {
    const dataEmployers = await getEmployerModel().findAll();
    return res.json(dataEmployers);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET EMPLOYER BY ID
const getEmployerById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataEmployer = await getEmployerModel().findByPk(id);
    return dataEmployer
      ? res.json(dataEmployer)
      : res.json({ message: messageEmployerNotFound });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE EMPLOYER BY ID
const updateEmployerById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataEmployer = await getEmployerModel().findByPk(id);
    if (!dataEmployer) {
      return res.json({ message: messageEmployerNotFound });
    }

    const employerUpdated = await dataEmployer.update(
      { ...req.body },
      { where: { id: id } }
    );
    return res.json(employerUpdated);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE EMPLOYER BY ID
const deleteEmployerById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataEmployer = await getEmployerModel().findByPk(id);
    if (!dataEmployer) {
      return res.json({ message: messageEmployerNotFound });
    }

    await dataEmployer.destroy();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE ALL EMPLOYERS
const deleteAllEmployers = async (req: Request, res: Response) => {
  try {
    await getEmployerModel().drop();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//DATA ROUTES EXPORTED
const employersCtrl = {
  createEmployer,
  getAllEmployers,
  getEmployerById,
  updateEmployerById,
  deleteEmployerById,
  deleteAllEmployers,
};

export default employersCtrl;
