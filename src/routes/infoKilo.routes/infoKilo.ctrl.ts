import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getInfoKiloModel = () => {
  return ConnexionBd.getSequelizeDb().models.Info_kilo;
};
const messageInfoKiloNotFound = "Cet info sur le kilo n'éxiste pas.";

//TODO CREATE INFO_KILO
const createInfoKilo = async (req: Request, res: Response) => {
  try {
    const dataInfoKilo = await getInfoKiloModel().create({ ...req.body });
    return res.status(201).json(dataInfoKilo);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET INFO_KILO
const getInfoKilo = async (req: Request, res: Response) => {
  try {
    const dataInfoKilo = await getInfoKiloModel().findAll({ limit: 1 });
    return res.json(dataInfoKilo);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE INFO_KILO BY ID
const updateInfoKiloById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataInfoKilo = await getInfoKiloModel().findByPk(id);
    if (!dataInfoKilo) {
      return res.json({ message: messageInfoKiloNotFound });
    }

    const infoKiloUpdated = await dataInfoKilo.update(
      { ...req.body },
      { where: { id: id } }
    );
    return res.json(infoKiloUpdated);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE INFO_KILO BY ID
const deleteInfoKiloById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataInfoKilo = await getInfoKiloModel().findByPk(id);
    if (!dataInfoKilo) {
      return res.json({ message: messageInfoKiloNotFound });
    }

    await dataInfoKilo.destroy();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//DATA ROUTES EXPORTED
const infoKiloCtrl = {
  createInfoKilo,
  getInfoKilo,
  updateInfoKiloById,
  deleteInfoKiloById,
};

export default infoKiloCtrl;
