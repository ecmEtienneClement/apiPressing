"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facture_ctrl_1 = __importDefault(require("./facture.ctrl"));
const facturesRoutes = (0, express_1.Router)();
//
facturesRoutes.post("/", facture_ctrl_1.default.createFacture);
facturesRoutes.get("/", facture_ctrl_1.default.getAllFactures);
facturesRoutes.get("/:id", facture_ctrl_1.default.getFactureById);
facturesRoutes.put("/:id", facture_ctrl_1.default.updateFactureById);
facturesRoutes.delete("/all", facture_ctrl_1.default.deleteAllFactures);
facturesRoutes.delete("/:id", facture_ctrl_1.default.deleteFactureById);
//
exports.default = facturesRoutes;
