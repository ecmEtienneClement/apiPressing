"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const etatFinancier_ctrl_1 = __importDefault(require("./etatFinancier.ctrl"));
const etatFinancierRoutes = (0, express_1.Router)();
//
etatFinancierRoutes.post("/", etatFinancier_ctrl_1.default.createEtatFinancier);
etatFinancierRoutes.get("/", etatFinancier_ctrl_1.default.getEtatFinancier);
etatFinancierRoutes.put("/:id", etatFinancier_ctrl_1.default.updateEtatFinancierById);
etatFinancierRoutes.delete("/", etatFinancier_ctrl_1.default.deleteEtatFinancier);
//
exports.default = etatFinancierRoutes;
