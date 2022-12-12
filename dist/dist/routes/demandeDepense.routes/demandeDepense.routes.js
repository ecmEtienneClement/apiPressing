"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_employer_authorization_1 = __importDefault(require("../../authorizations/role.employer.authorization"));
const demandeDepense_ctrl_1 = __importDefault(require("./demandeDepense.ctrl"));
const demandeDepensesRoutes = (0, express_1.Router)();
//
demandeDepensesRoutes.post("/", role_employer_authorization_1.default, demandeDepense_ctrl_1.default.createDemandeDepense);
demandeDepensesRoutes.get("/", demandeDepense_ctrl_1.default.getAllDemandeDepenses);
demandeDepensesRoutes.get("/:id", demandeDepense_ctrl_1.default.getDemandeDepenseById);
demandeDepensesRoutes.put("/:id", role_employer_authorization_1.default, demandeDepense_ctrl_1.default.updateDemandeDepenseById);
demandeDepensesRoutes.delete("/all", demandeDepense_ctrl_1.default.deleteAllDemandeDepenses);
demandeDepensesRoutes.delete("/:id", demandeDepense_ctrl_1.default.deleteDemandeDepenseById);
//
exports.default = demandeDepensesRoutes;
