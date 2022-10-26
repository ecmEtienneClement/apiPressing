"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_employer_authorization_1 = __importDefault(require("../../authorizations/role.employer.authorization"));
const detailTypePiece_ctrl_1 = __importDefault(require("./detailTypePiece.ctrl"));
const detailTypeKiloRoutes = (0, express_1.Router)();
//
detailTypeKiloRoutes.post("/", role_employer_authorization_1.default, detailTypePiece_ctrl_1.default.createDetailTypeKilo);
detailTypeKiloRoutes.put("/:id", role_employer_authorization_1.default, detailTypePiece_ctrl_1.default.updateDetailTypeKiloById);
detailTypeKiloRoutes.delete("/", detailTypePiece_ctrl_1.default.deleteDetailTypeKilo);
//
exports.default = detailTypeKiloRoutes;
