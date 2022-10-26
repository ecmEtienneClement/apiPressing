import { Router } from "express";
import depensesCtrl from "./depense.ctrl";

const depensesRoutes: Router = Router();
//
depensesRoutes.post("/", depensesCtrl.createDepense);
depensesRoutes.get("/", depensesCtrl.getAllDepenses);
depensesRoutes.delete("/all", depensesCtrl.deleteAllDepenses);
depensesRoutes.delete("/:id", depensesCtrl.deleteDepenseById);
//
export default depensesRoutes;
