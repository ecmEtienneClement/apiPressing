import { Router } from "express";
import roleAdminAuthorization from "../../authorizations/role.admin.authorization";
import infoPieceCtrl from "./infoPiece.ctrl";

const infoPieceRoutes: Router = Router();
//
infoPieceRoutes.post(
  "/",
  roleAdminAuthorization,
  infoPieceCtrl.createInfoPiece
);
infoPieceRoutes.get("/", infoPieceCtrl.getInfoPiece);
infoPieceRoutes.put(
  "/:id",
  roleAdminAuthorization,
  infoPieceCtrl.updateInfoPieceById
);
infoPieceRoutes.delete(
  "/:id",
  roleAdminAuthorization,
  infoPieceCtrl.deleteInfoPieceById
);
//
export default infoPieceRoutes;
