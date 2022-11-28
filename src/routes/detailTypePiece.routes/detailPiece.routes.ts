import { Router } from "express";
import roleEmployerAuthorization from "../../authorizations/role.employer.authorization";
import detailPiecesCtrl from "./detailPiece.ctrl";

const detailPiecesRoutes: Router = Router();
//
detailPiecesRoutes.post(
  "/",
  roleEmployerAuthorization,
  detailPiecesCtrl.createDetailTypePiece
);
detailPiecesRoutes.put(
  "/:id",
  roleEmployerAuthorization,
  detailPiecesCtrl.updateDetailTypePieceById
);
detailPiecesRoutes.delete("/:id", detailPiecesCtrl.deleteDetailTypePieceById);
//
export default detailPiecesRoutes;
