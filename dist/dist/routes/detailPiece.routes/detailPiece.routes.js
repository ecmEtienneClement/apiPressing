"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_employer_authorization_1 = __importDefault(require("../../authorizations/role.employer.authorization"));
const detailPiece_ctrl_1 = __importDefault(require("./detailPiece.ctrl"));
const detailPiecesRoutes = (0, express_1.Router)();
//
detailPiecesRoutes.post("/", role_employer_authorization_1.default, detailPiece_ctrl_1.default.createDetailPiece);
detailPiecesRoutes.put("/:id", role_employer_authorization_1.default, detailPiece_ctrl_1.default.updateDetailPieceById);
detailPiecesRoutes.delete("/:id", detailPiece_ctrl_1.default.deleteDetailPieceById);
//
exports.default = detailPiecesRoutes;
