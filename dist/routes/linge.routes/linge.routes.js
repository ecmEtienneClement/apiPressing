"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_employer_authorization_1 = __importDefault(require("../../authorizations/role.employer.authorization"));
const linge_ctrl_1 = __importDefault(require("./linge.ctrl"));
const lingesRoutes = (0, express_1.Router)();
//
lingesRoutes.post("/", role_employer_authorization_1.default, linge_ctrl_1.default.createLinge);
lingesRoutes.get("/", linge_ctrl_1.default.getAllLinges);
lingesRoutes.get("/:id", linge_ctrl_1.default.getLingeById);
lingesRoutes.put("/:id", role_employer_authorization_1.default, linge_ctrl_1.default.updateLingeById);
lingesRoutes.delete("/all", linge_ctrl_1.default.deleteAllLinges);
lingesRoutes.delete("/:id", linge_ctrl_1.default.deleteLingeById);
//
exports.default = lingesRoutes;
