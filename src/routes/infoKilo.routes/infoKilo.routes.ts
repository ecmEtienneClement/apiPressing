import { Router } from "express";
import roleAdminAuthorization from "../../authorizations/role.admin.authorization";
import infoKiloCtrl from "./infoKilo.ctrl";

const infoKiloRoutes: Router = Router();
//
infoKiloRoutes.post("/", roleAdminAuthorization, infoKiloCtrl.createInfoKilo);
infoKiloRoutes.get("/", infoKiloCtrl.getInfoKilo);
infoKiloRoutes.put(
  "/:id",
  roleAdminAuthorization,
  infoKiloCtrl.updateInfoKiloById
);
infoKiloRoutes.delete(
  "/:id",
  roleAdminAuthorization,
  infoKiloCtrl.deleteInfoKiloById
);
//
export default infoKiloRoutes;
