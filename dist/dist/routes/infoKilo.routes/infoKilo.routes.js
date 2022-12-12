"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_admin_authorization_1 = __importDefault(require("../../authorizations/role.admin.authorization"));
const infoKilo_ctrl_1 = __importDefault(require("./infoKilo.ctrl"));
const infoKiloRoutes = (0, express_1.Router)();
//
infoKiloRoutes.post("/", role_admin_authorization_1.default, infoKilo_ctrl_1.default.createInfoKilo);
infoKiloRoutes.get("/", infoKilo_ctrl_1.default.getInfoKilo);
infoKiloRoutes.put("/:id", role_admin_authorization_1.default, infoKilo_ctrl_1.default.updateInfoKiloById);
infoKiloRoutes.delete("/:id", role_admin_authorization_1.default, infoKilo_ctrl_1.default.deleteInfoKiloById);
//
exports.default = infoKiloRoutes;
