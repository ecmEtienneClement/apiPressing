"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_admin_authorization_1 = __importDefault(require("../../authorizations/role.admin.authorization"));
const employer_ctrl_1 = __importDefault(require("./employer.ctrl"));
const employersRoutes = (0, express_1.Router)();
//
employersRoutes.post("/", role_admin_authorization_1.default, employer_ctrl_1.default.createEmployer);
employersRoutes.get("/", role_admin_authorization_1.default, employer_ctrl_1.default.getAllEmployers);
employersRoutes.get("/:id", employer_ctrl_1.default.getEmployerById);
employersRoutes.put("/:id", employer_ctrl_1.default.updateEmployerById);
employersRoutes.delete("/all", role_admin_authorization_1.default, employer_ctrl_1.default.deleteAllEmployers);
employersRoutes.delete("/:id", role_admin_authorization_1.default, employer_ctrl_1.default.deleteEmployerById);
//
exports.default = employersRoutes;
