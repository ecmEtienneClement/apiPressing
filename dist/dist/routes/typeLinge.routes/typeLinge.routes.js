"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_admin_authorization_1 = __importDefault(require("../../authorizations/role.admin.authorization"));
const typeLinge_ctrl_1 = __importDefault(require("./typeLinge.ctrl"));
const typeLingeRoutes = (0, express_1.Router)();
//
typeLingeRoutes.post("/", role_admin_authorization_1.default, typeLinge_ctrl_1.default.createTypeLinge);
typeLingeRoutes.get("/", typeLinge_ctrl_1.default.getTypeLinge);
typeLingeRoutes.put("/:id", role_admin_authorization_1.default, typeLinge_ctrl_1.default.updateTypeLingeById);
typeLingeRoutes.delete("/:id", role_admin_authorization_1.default, typeLinge_ctrl_1.default.deleteTypeLingeById);
//
exports.default = typeLingeRoutes;
