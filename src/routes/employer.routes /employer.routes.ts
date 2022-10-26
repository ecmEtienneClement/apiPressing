import { Router } from "express";
import roleAdminAuthorization from "../../authorizations/role.admin.authorization";
import employersCtrl from "./employer.ctrl";

const employersRoutes: Router = Router();
//
employersRoutes.post("/", roleAdminAuthorization, employersCtrl.createEmployer);
employersRoutes.get("/", roleAdminAuthorization, employersCtrl.getAllEmployers);
employersRoutes.get("/:id", employersCtrl.getEmployerById);
employersRoutes.put("/:id", employersCtrl.updateEmployerById);
employersRoutes.delete(
  "/all",
  roleAdminAuthorization,
  employersCtrl.deleteAllEmployers
);
employersRoutes.delete(
  "/:id",
  roleAdminAuthorization,
  employersCtrl.deleteEmployerById
);
//
export default employersRoutes;
