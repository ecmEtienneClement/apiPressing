import { Router } from "express";
import compteBloquerCtrl from "./compteBloque.ctrl";

const compteBloquersRoutes: Router = Router();
//
compteBloquersRoutes.post("/", compteBloquerCtrl.createCompteBloquer);
compteBloquersRoutes.get("/", compteBloquerCtrl.getAllCompteBloquer);
compteBloquersRoutes.get("/:email", compteBloquerCtrl.getCompteBloquerByEmail);
compteBloquersRoutes.delete("/:id", compteBloquerCtrl.deleteCompteBloquerById);
//
export default compteBloquersRoutes;
