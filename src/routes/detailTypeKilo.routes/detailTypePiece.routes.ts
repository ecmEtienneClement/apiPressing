import { Router } from "express";
import roleEmployerAuthorization from "../../authorizations/role.employer.authorization";
import detailTypeKiloCtrl from "./detailTypePiece.ctrl";

const detailTypeKiloRoutes: Router = Router();
//
detailTypeKiloRoutes.post(
  "/",
  roleEmployerAuthorization,
  detailTypeKiloCtrl.createDetailTypeKilo
);
detailTypeKiloRoutes.put(
  "/:id",
  roleEmployerAuthorization,
  detailTypeKiloCtrl.updateDetailTypeKiloById
);
detailTypeKiloRoutes.delete("/", detailTypeKiloCtrl.deleteDetailTypeKilo);
//
export default detailTypeKiloRoutes;
