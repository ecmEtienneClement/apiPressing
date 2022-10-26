import { Router } from "express";
import roleEmployerAuthorization from "../../authorizations/role.employer.authorization";
import detailPiecesCtrl from "./detailPiece.ctrl";

const detailPiecesRoutes: Router = Router();
//
detailPiecesRoutes.post(
  "/",
  roleEmployerAuthorization,
  detailPiecesCtrl.createDetailPiece
);
detailPiecesRoutes.put(
  "/:id",
  roleEmployerAuthorization,
  detailPiecesCtrl.updateDetailPieceById
);
detailPiecesRoutes.delete("/:id", detailPiecesCtrl.deleteDetailPieceById);
//
export default detailPiecesRoutes;
