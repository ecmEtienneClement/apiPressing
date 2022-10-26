import { Router } from "express";
import roleAdminAuthorization from "../../authorizations/role.admin.authorization";
import typeLingeCtrl from "./typeLinge.ctrl";

const typeLingeRoutes: Router = Router();
//
typeLingeRoutes.post(
  "/",
  roleAdminAuthorization,
  typeLingeCtrl.createTypeLinge
);
typeLingeRoutes.get("/", typeLingeCtrl.getTypeLinge);
typeLingeRoutes.put(
  "/:id",
  roleAdminAuthorization,
  typeLingeCtrl.updateTypeLingeById
);
typeLingeRoutes.delete(
  "/:id",
  roleAdminAuthorization,
  typeLingeCtrl.deleteTypeLingeById
);
//
export default typeLingeRoutes;
