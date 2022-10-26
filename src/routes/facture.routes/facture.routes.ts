import { Router } from "express";
import facturesCtrl from "./facture.ctrl";

const facturesRoutes: Router = Router();
//
facturesRoutes.post("/", facturesCtrl.createFacture);
facturesRoutes.get("/", facturesCtrl.getAllFactures);
facturesRoutes.get("/:id", facturesCtrl.getFactureById);
facturesRoutes.put("/:id", facturesCtrl.updateFactureById);
facturesRoutes.delete("/all", facturesCtrl.deleteAllFactures);
facturesRoutes.delete("/:id", facturesCtrl.deleteFactureById);
//
export default facturesRoutes;
