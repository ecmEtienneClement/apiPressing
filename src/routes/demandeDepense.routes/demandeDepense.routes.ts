import { Router } from "express";
import roleEmployerAuthorization from "../../authorizations/role.employer.authorization";
import demandeDepensesCtrl from "./demandeDepense.ctrl";

const demandeDepensesRoutes: Router = Router();
//
demandeDepensesRoutes.post(
  "/",
  roleEmployerAuthorization,
  demandeDepensesCtrl.createDemandeDepense
);
demandeDepensesRoutes.get("/", demandeDepensesCtrl.getAllDemandeDepenses);
demandeDepensesRoutes.get("/:id", demandeDepensesCtrl.getDemandeDepenseById);
demandeDepensesRoutes.put(
  "/:id",
  roleEmployerAuthorization,
  demandeDepensesCtrl.updateDemandeDepenseById
);
demandeDepensesRoutes.delete(
  "/all",
  demandeDepensesCtrl.deleteAllDemandeDepenses
);
demandeDepensesRoutes.delete(
  "/:id",
  demandeDepensesCtrl.deleteDemandeDepenseById
);
//
export default demandeDepensesRoutes;
