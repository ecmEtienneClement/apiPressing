import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import { NameModelsListe } from "../../models/namingModelListe";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getModels = () => {
  return ConnexionBd.modelsList.get(NameModelsListe.detailTypePiece);
};
const messageDetailTypePieceNotFound = "Ce détail de type piece n'éxiste pas.";

//TODO CREATE DETAIL_PIECE
const createDetailTypePiece = async (req: Request, res: Response) => {
  try {
    const dataDetailTypePieceModel = await getModels().create({
      ...req.body,
    });
    return res.status(201).json(dataDetailTypePieceModel);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE DETAIL_PIECE BY ID
const updateDetailTypePieceById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataDetailTypePieceModel = await getModels().findByPk(id);
    if (!dataDetailTypePieceModel) {
      return res.status(404).json({ message: messageDetailTypePieceNotFound });
    }

    const detailPieceUpdated = await dataDetailTypePieceModel.update(
      { ...req.body },
      { where: { id: id } }
    );
    return res.json(detailPieceUpdated);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE DETAIL_PIECE BY ID
const deleteDetailTypePieceById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataDetailTypePieceModel = await getModels().findByPk(id);
    if (!dataDetailTypePieceModel) {
      return res.status(404).json({ message: messageDetailTypePieceNotFound });
    }

    await dataDetailTypePieceModel.destroy();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//DATA ROUTES EXPORTED
const detailPiecesCtrl = {
  createDetailTypePiece,
  updateDetailTypePieceById,
  deleteDetailTypePieceById,
};

export default detailPiecesCtrl;
