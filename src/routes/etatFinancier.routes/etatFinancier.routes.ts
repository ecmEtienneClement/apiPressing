import { Router } from "express";
import etatFinancierCtrl from "./etatFinancier.ctrl";

const etatFinancierRoutes: Router = Router();
//
etatFinancierRoutes.post("/", etatFinancierCtrl.createEtatFinancier);
etatFinancierRoutes.get("/", etatFinancierCtrl.getEtatFinancier);
etatFinancierRoutes.put("/:id", etatFinancierCtrl.updateEtatFinancierById);
etatFinancierRoutes.delete("/", etatFinancierCtrl.deleteEtatFinancier);
//
export default etatFinancierRoutes;
