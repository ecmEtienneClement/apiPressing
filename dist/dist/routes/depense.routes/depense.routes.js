"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const depense_ctrl_1 = __importDefault(require("./depense.ctrl"));
const depensesRoutes = (0, express_1.Router)();
//
depensesRoutes.post("/", depense_ctrl_1.default.createDepense);
depensesRoutes.get("/", depense_ctrl_1.default.getAllDepenses);
depensesRoutes.delete("/all", depense_ctrl_1.default.deleteAllDepenses);
depensesRoutes.delete("/:id", depense_ctrl_1.default.deleteDepenseById);
//
exports.default = depensesRoutes;
