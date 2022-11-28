"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_employer_authorization_1 = __importDefault(require("../../authorizations/role.employer.authorization"));
const detailTypePiece_ctrl_1 = __importDefault(require("./detailTypePiece.ctrl"));
const detailTypePiecesRoutes = (0, express_1.Router)();
//
detailTypePiecesRoutes.post("/", role_employer_authorization_1.default, detailTypePiece_ctrl_1.default.createDetailTypePiece);
detailTypePiecesRoutes.get("/:id", role_employer_authorization_1.default, detailTypePiece_ctrl_1.default.getDetailTypePieceById);
detailTypePiecesRoutes.delete("/:id", detailTypePiece_ctrl_1.default.deleteDetailTypePieceById);
//
exports.default = detailTypePiecesRoutes;
