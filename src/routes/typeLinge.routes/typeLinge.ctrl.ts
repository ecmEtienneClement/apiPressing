import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import { NameModelsListe } from "../../models/namingModelListe";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getModels = () => {
  return ConnexionBd.modelsList.get(NameModelsListe.typeLinge);
};
const messageTypeLingeNotFound = "Ce type de linge n'éxiste pas.";

//TODO CREATE TYPE_LINGE
const createTypeLinge = async (req: Request, res: Response) => {
  try {
    const dataTypeLinge = await getModels().create({
      ...req.body,
    });
    return res.status(201).json(dataTypeLinge);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET TYPE_LINGE
const getTypeLinge = async (req: Request, res: Response) => {
  try {
    const dataTypeLinge = await getModels().findAll();
    return res.json(dataTypeLinge);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE TYPE_LINGE BY ID
const updateTypeLingeById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataTypeLinge = await getModels().findByPk(id);
    if (!dataTypeLinge) {
      return res.status(404).json({ message: messageTypeLingeNotFound });
    }

    const typeLingeUpdated = await dataTypeLinge.update(
      { ...req.body },
      { where: { id: id } }
    );
    return res.json(typeLingeUpdated);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE TYPE_LINGE BY ID
const deleteTypeLingeById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataTypeLinge = await getModels().findByPk(id);
    if (!dataTypeLinge) {
      return res.json({ message: messageTypeLingeNotFound });
    }

    await dataTypeLinge.destroy();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//DATA ROUTES EXPORTED
const typeLingeCtrl = {
  createTypeLinge,
  getTypeLinge,
  updateTypeLingeById,
  deleteTypeLingeById,
};

export default typeLingeCtrl;
