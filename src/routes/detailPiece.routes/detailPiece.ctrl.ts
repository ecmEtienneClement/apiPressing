import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getDetailPieceModel = () => {
  return ConnexionBd.getSequelizeDb().models.Detail_piece;
};
const messageDetailPieceNotFound = "Ce détail de piece n'éxiste pas.";

//TODO CREATE DETAIL_PIECE
const createDetailPiece = async (req: Request, res: Response) => {
  try {
    const dataDetailPieceModel = await getDetailPieceModel().create({
      ...req.body,
    });
    return res.status(201).json(dataDetailPieceModel);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE DETAIL_PIECE BY ID
const updateDetailPieceById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataDetailPieceModel = await getDetailPieceModel().findByPk(id);
    if (!dataDetailPieceModel) {
      return res.json({ message: messageDetailPieceNotFound });
    }

    const detailPieceUpdated = await dataDetailPieceModel.update(
      { ...req.body },
      { where: { id: id } }
    );
    return res.json(detailPieceUpdated);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE DETAIL_PIECE BY ID
const deleteDetailPieceById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataDetailPieceModel = await getDetailPieceModel().findByPk(id);
    if (!dataDetailPieceModel) {
      return res.json({ message: messageDetailPieceNotFound });
    }

    await dataDetailPieceModel.destroy();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//DATA ROUTES EXPORTED
const detailPiecesCtrl = {
  createDetailPiece,
  updateDetailPieceById,
  deleteDetailPieceById,
};

export default detailPiecesCtrl;
