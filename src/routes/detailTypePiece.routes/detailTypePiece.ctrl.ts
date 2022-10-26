import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getDetailTypePieceModel = () => {
  return ConnexionBd.getSequelizeDb().models.Detail_type_piece;
};
const messageDetailTypePieceNotFound = "Ce détail de type piece n'éxiste pas.";

//TODO CREATE DETAIL_TYPE_PIECE
const createDetailTypePiece = async (req: Request, res: Response) => {
  try {
    const dataDetailTypePieceModel = await getDetailTypePieceModel().create({
      ...req.body,
    });
    return res.status(201).json(dataDetailTypePieceModel);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};
//TODO DELETE DETAIL_TYPE_PIECE BY ID
const deleteDetailTypePieceById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataDetailTypePieceModel = await getDetailTypePieceModel().findByPk(
      id
    );
    if (!dataDetailTypePieceModel) {
      return res.json({ message: messageDetailTypePieceNotFound });
    }

    await dataDetailTypePieceModel.destroy();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//DATA ROUTES EXPORTED
const detailTypePiecesCtrl = {
  createDetailTypePiece,
  deleteDetailTypePieceById,
};

export default detailTypePiecesCtrl;
