import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import { NameModelsListe } from "../../models/namingModelListe";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getModels = () => {
  return ConnexionBd.modelsList.get(NameModelsListe.infoKilo);
};
const messageInfoKiloNotFound = "Cet info sur le kilo n'éxiste pas.";

//TODO CREATE INFO_KILO
const createInfoKilo = async (req: Request, res: Response) => {
  try {
    const dataInfoKilo = await getModels().create({
      ...req.body,
    });
    return res.status(201).json(dataInfoKilo);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET INFO_KILO
const getInfoKilo = async (req: Request, res: Response) => {
  try {
    const dataInfoKilo = await getModels().findAll({
      limit: 1,
    });
    return res.json(dataInfoKilo);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE INFO_KILO BY ID
const updateInfoKiloById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataInfoKilo = await getModels().findByPk(id);
    if (!dataInfoKilo) {
      return res.status(404).json({ message: messageInfoKiloNotFound });
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
    const dataInfoKilo = await getModels().findByPk(id);
    if (!dataInfoKilo) {
      return res.status(404).json({ message: messageInfoKiloNotFound });
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
