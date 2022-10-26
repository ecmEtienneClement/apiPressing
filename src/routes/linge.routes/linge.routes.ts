import { Router } from "express";
import roleEmployerAuthorization from "../../authorizations/role.employer.authorization";
import lingesCtrl from "./linge.ctrl";

const lingesRoutes: Router = Router();
//
lingesRoutes.post("/", roleEmployerAuthorization, lingesCtrl.createLinge);
lingesRoutes.get("/", lingesCtrl.getAllLinges);
lingesRoutes.get("/:id", lingesCtrl.getLingeById);
lingesRoutes.put("/:id", roleEmployerAuthorization, lingesCtrl.updateLingeById);
lingesRoutes.delete("/all", lingesCtrl.deleteAllLinges);
lingesRoutes.delete("/:id", lingesCtrl.deleteLingeById);
//
export default lingesRoutes;
