import { Router } from "express";
import roleEmployerAuthorization from "../../authorizations/role.employer.authorization";
import clientCtrl from "./client.ctrl";

const clientsRoutes: Router = Router();
//
clientsRoutes.post("/", roleEmployerAuthorization, clientCtrl.createClient);
clientsRoutes.get("/", clientCtrl.getAllClients);
clientsRoutes.get("/:id", clientCtrl.getClientById);
clientsRoutes.put(
  "/:id",
  roleEmployerAuthorization,
  clientCtrl.updateClientById
);
clientsRoutes.delete("/all", clientCtrl.deleteAllClients);
clientsRoutes.delete("/:id", clientCtrl.deleteClientById);
//
export default clientsRoutes;
