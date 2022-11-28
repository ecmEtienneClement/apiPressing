import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import { NameModelsListe } from "../../models/namingModelListe";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getModels = () => {
  return ConnexionBd.modelsList.get(NameModelsListe.detailTypeKilo);
};
const messageDetailTypeKiloNotFound = "Ce détail de type kilo n'éxiste pas.";

//TODO CREATE DETAIL_TYPE_KILO
const createDetailTypeKilo = async (req: Request, res: Response) => {
  try {
    const dataDetailTypeKiloModel = await getModels().create({
      ...req.body,
    });
    return res.status(201).json(dataDetailTypeKiloModel);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE DETAIL_TYPE_KILO BY ID
const updateDetailTypeKiloById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataDetailTypeKiloModel = await getModels().findByPk(id);
    if (!dataDetailTypeKiloModel) {
      return res.status(404).json({ message: messageDetailTypeKiloNotFound });
    }

    const detailTypeKiloUpdated = await dataDetailTypeKiloModel.update(
      { ...req.body },
      { where: { id: id } }
    );
    return res.json(detailTypeKiloUpdated);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE  DETAIL_TYPE_KILO
const deleteDetailTypeKilo = async (req: Request, res: Response) => {
  try {
    await getModels().drop();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//DATA ROUTES EXPORTED
const detailTypeKiloCtrl = {
  createDetailTypeKilo,
  updateDetailTypeKiloById,
  deleteDetailTypeKilo,
};

export default detailTypeKiloCtrl;
