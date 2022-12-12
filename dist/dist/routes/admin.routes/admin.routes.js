"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_ctrl_1 = __importDefault(require("./admin.ctrl"));
const adminsRoutes = (0, express_1.Router)();
//
adminsRoutes.post("/", admin_ctrl_1.default.createAdmin);
adminsRoutes.get("/", admin_ctrl_1.default.getAllAdmins);
adminsRoutes.get("/:id", admin_ctrl_1.default.getAdminById);
adminsRoutes.put("/:id", admin_ctrl_1.default.updateAdminById);
adminsRoutes.delete("/all", admin_ctrl_1.default.deleteAllAdmins);
adminsRoutes.delete("/:id", admin_ctrl_1.default.deleteAdminById);
//
exports.default = adminsRoutes;
