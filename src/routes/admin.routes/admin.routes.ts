import { Router } from "express";
import adminsCtrl from "./admin.ctrl";

const adminsRoutes: Router = Router();
//
adminsRoutes.post("/", adminsCtrl.createAdmin);
adminsRoutes.get("/", adminsCtrl.getAllAdmins);
adminsRoutes.get("/:id", adminsCtrl.getAdminById);
adminsRoutes.put("/:id", adminsCtrl.updateAdminById);
adminsRoutes.delete("/all", adminsCtrl.deleteAllAdmins);
adminsRoutes.delete("/:id", adminsCtrl.deleteAdminById);
//
export default adminsRoutes;
