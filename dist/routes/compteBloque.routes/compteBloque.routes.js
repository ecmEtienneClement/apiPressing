"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compteBloque_ctrl_1 = __importDefault(require("./compteBloque.ctrl"));
const compteBloquersRoutes = (0, express_1.Router)();
//
compteBloquersRoutes.post("/", compteBloque_ctrl_1.default.createCompteBloquer);
compteBloquersRoutes.get("/", compteBloque_ctrl_1.default.getAllCompteBloquer);
compteBloquersRoutes.get("/:email", compteBloque_ctrl_1.default.getCompteBloquerByEmail);
compteBloquersRoutes.delete("/:id", compteBloque_ctrl_1.default.deleteCompteBloquerById);
//
exports.default = compteBloquersRoutes;
