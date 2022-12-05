import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import { NameModelsListe } from "../../models/namingModelListe";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getModels = () => {
  return ConnexionBd.modelsList.get(NameModelsListe.linge);
};
const messageLingeNotFound = "Cet linge n'éxiste pas.";

//TODO CREATE LINGE
const createLinge = async (req: Request, res: Response) => {
  try {
    const dataLinge = await getModels().create({
      ...req.body,
    });
    return res.status(201).json(dataLinge);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET ALL LINGES
const getAllLinges = async (req: Request, res: Response) => {
  try {
    //
    const dataLinges = await getModels().findAll({
      include: { all: true },
    });
    //
    return res.json(dataLinges);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET LINGE BY ID
const getLingeById = async (req: Request, res: Response) => {
  try {
    const id = routesHelpers.getParamId(req);
    //
    //
    const dataLinge = await getModels().findByPk(id, {
      include: { all: true },
    });

    if (!dataLinge) {
      return res.status(404).json({ message: messageLingeNotFound });
    }
    //
    return res.json(dataLinge);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE LINGE BY ID
const updateLingeById = async (req: Request, res: Response) => {
  try {
    const id = routesHelpers.getParamId(req);

    const dataLinge = await getModels().findByPk(id);
    if (!dataLinge) {
      return res.status(404).json({ message: messageLingeNotFound });
    }

    //vrf OWNER
    const employerOwnerLinge: string = dataLinge.getDataValue("EmployeId");
    routesHelpers.vrfUserOwner(req, employerOwnerLinge, true);
    //

    await dataLinge.update({ ...req.body }, { where: { id: id } });
    return getLingeById(req, res);
   
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE LINGE BY ID
const deleteLingeById = async (req: Request, res: Response) => {
  try {
    const id = routesHelpers.getParamId(req);

    const dataLinge = await getModels().findByPk(id);
    if (!dataLinge) {
      return res.status(404).json({ message: messageLingeNotFound });
    }
    //vrf OWNER
    const employerOwnerLinge: string = dataLinge.getDataValue("EmployeId");
    routesHelpers.vrfUserOwner(req, employerOwnerLinge, true);
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
    await getModels().drop();
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
