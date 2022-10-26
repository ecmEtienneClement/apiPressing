import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getLingeModel = () => {
  return ConnexionBd.getSequelizeDb().models.Linge;
};
const messageLingeNotFound = "Cet linge n'éxiste pas.";

//TODO CREATE LINGE
const createLinge = async (req: Request, res: Response) => {
  try {
    const dataLinge = await getLingeModel().create({ ...req.body });
    return res.status(201).json(dataLinge);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET ALL LINGES
const getAllLinges = async (req: Request, res: Response) => {
  try {
    const dataLinges = await getLingeModel().findAll();
    return res.json(dataLinges);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET LINGE BY ID
const getLingeById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataLinge = await getLingeModel().findByPk(id);
    return dataLinge
      ? res.json(dataLinge)
      : res.json({ message: messageLingeNotFound });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE LINGE BY ID
const updateLingeById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataLinge = await getLingeModel().findByPk(id);
    if (!dataLinge) {
      return res.json({ message: messageLingeNotFound });
    }

    //vrf OWNER
    const employerOwnerLinge: string = dataLinge.getDataValue("EmployeId");
    routesHelpers.vrfUserOwner(req, employerOwnerLinge);
    //

    const adminUpdated = await dataLinge.update(
      { ...req.body },
      { where: { id: id } }
    );
    return res.json(adminUpdated);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE LINGE BY ID
const deleteLingeById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataLinge = await getLingeModel().findByPk(id);
    if (!dataLinge) {
      return res.json({ message: messageLingeNotFound });
    }
    //vrf OWNER
    const employerOwnerLinge: string = dataLinge.getDataValue("EmployeId");
    routesHelpers.vrfUserOwner(req, employerOwnerLinge);
    //
    await dataLinge.destroy();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE ALL LINGES
const deleteAllLinges = async (req: Request, res: Response) => {
  try {
    await getLingeModel().drop();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//DATA ROUTES EXPORTED
const lingesCtrl = {
  createLinge,
  getAllLinges,
  getLingeById,
  updateLingeById,
  deleteLingeById,
  deleteAllLinges,
};

export default lingesCtrl;
