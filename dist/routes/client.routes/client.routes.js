"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_employer_authorization_1 = __importDefault(require("../../authorizations/role.employer.authorization"));
const client_ctrl_1 = __importDefault(require("./client.ctrl"));
const clientsRoutes = (0, express_1.Router)();
//
clientsRoutes.post("/", role_employer_authorization_1.default, client_ctrl_1.default.createClient);
clientsRoutes.get("/", client_ctrl_1.default.getAllClients);
clientsRoutes.get("/:id", client_ctrl_1.default.getClientById);
clientsRoutes.put("/:id", role_employer_authorization_1.default, client_ctrl_1.default.updateClientById);
clientsRoutes.delete("/all", client_ctrl_1.default.deleteAllClients);
clientsRoutes.delete("/:id", client_ctrl_1.default.deleteClientById);
//
exports.default = clientsRoutes;
