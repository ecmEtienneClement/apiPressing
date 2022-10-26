import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getInfoPieceModel = () => {
  return ConnexionBd.getSequelizeDb().models.Info_piece;
};
const messageInfoPieceNotFound = "Cet info sur le piece n'éxiste pas.";

//TODO CREATE INFO_PIECE
const createInfoPiece = async (req: Request, res: Response) => {
  try {
    const dataInfoPiece = await getInfoPieceModel().create({ ...req.body });
    return res.status(201).json(dataInfoPiece);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET INFO_PIECE
const getInfoPiece = async (req: Request, res: Response) => {
  try {
    const dataInfoPiece = await getInfoPieceModel().findAll({ limit: 1 });
    return res.json(dataInfoPiece);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE INFO_PIECE BY ID
const updateInfoPieceById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataInfoPiece = await getInfoPieceModel().findByPk(id);
    if (!dataInfoPiece) {
      return res.json({ message: messageInfoPieceNotFound });
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
    const dataInfoPiece = await getInfoPieceModel().findByPk(id);
    if (!dataInfoPiece) {
      return res.json({ message: messageInfoPieceNotFound });
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
