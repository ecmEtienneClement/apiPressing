"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_admin_authorization_1 = __importDefault(require("../../authorizations/role.admin.authorization"));
const infoPiece_ctrl_1 = __importDefault(require("./infoPiece.ctrl"));
const infoPieceRoutes = (0, express_1.Router)();
//
infoPieceRoutes.post("/", role_admin_authorization_1.default, infoPiece_ctrl_1.default.createInfoPiece);
infoPieceRoutes.get("/", infoPiece_ctrl_1.default.getInfoPiece);
infoPieceRoutes.put("/:id", role_admin_authorization_1.default, infoPiece_ctrl_1.default.updateInfoPieceById);
infoPieceRoutes.delete("/:id", role_admin_authorization_1.default, infoPiece_ctrl_1.default.deleteInfoPieceById);
//
exports.default = infoPieceRoutes;
