import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import { NameModelsListe } from "../../models/namingModelListe";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getModels = () => {
  return ConnexionBd.modelsList.get(NameModelsListe.infoPiece);
};
const messageInfoPieceNotFound = "Cet info sur le piece n'éxiste pas.";

//TODO CREATE INFO_PIECE
const createInfoPiece = async (req: Request, res: Response) => {
  try {
    const dataInfoPiece = await getModels().create({
      ...req.body,
    });
    return res.status(201).json(dataInfoPiece);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET INFO_PIECE
const getInfoPiece = async (req: Request, res: Response) => {
  try {
    const dataInfoPiece = await getModels().findAll();
    return res.json(dataInfoPiece);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE INFO_PIECE BY ID
const updateInfoPieceById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataInfoPiece = await getModels().findByPk(id);
    if (!dataInfoPiece) {
      return res.status(404).json({ message: messageInfoPieceNotFound });
    }

    const infoPieceUpdated = await dataInfoPiece.update(
      { ...req.body },
      { where: { id: id } }
    );
    return res.json(infoPieceUpdated);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE INFO_PIECE BY ID
const deleteInfoPieceById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataInfoPiece = await getModels().findByPk(id);
    if (!dataInfoPiece) {
      return res.status(404).json({ message: messageInfoPieceNotFound });
    }

    await dataInfoPiece.destroy();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//DATA ROUTES EXPORTED
const infoPieceCtrl = {
  createInfoPiece,
  getInfoPiece,
  updateInfoPieceById,
  deleteInfoPieceById,
};

export default infoPieceCtrl;
