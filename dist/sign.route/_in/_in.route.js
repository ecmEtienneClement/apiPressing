"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _in_ctrl_1 = __importDefault(require("./_in.ctrl"));
const singInRoute = (0, express_1.Router)();
singInRoute.post("/in", _in_ctrl_1.default);
//
exports.default = singInRoute;
