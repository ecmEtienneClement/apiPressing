import { Router } from "express";
import roleEmployerAuthorization from "../../authorizations/role.employer.authorization";
import detailTypePiecesCtrl from "./detailTypePiece.ctrl";

const detailTypePiecesRoutes: Router = Router();
//
detailTypePiecesRoutes.post(
  "/",
  roleEmployerAuthorization,
  detailTypePiecesCtrl.createDetailTypePiece
);
detailTypePiecesRoutes.delete(
  "/:id",
  detailTypePiecesCtrl.deleteDetailTypePieceById
);
//
export default detailTypePiecesRoutes;
