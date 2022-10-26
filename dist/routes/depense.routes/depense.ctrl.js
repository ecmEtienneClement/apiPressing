"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connexionBd_1 = __importDefault(require("../../connexionBd/connexionBd"));
const routes_errors_1 = __importDefault(require("../routes.errors"));
const routes_helper_1 = __importDefault(require("../routes.helper"));
//
const getDepenseModel = () => {
    return connexionBd_1.default.getSequelizeDb().models.Depense;
};
const messageDepenseNotFound = "Cette dépense n'éxiste pas.";
//TODO CREATE DEPENSE
const createDepense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataDepense = yield getDepenseModel().create(Object.assign({}, req.body));
        return res.status(201).json(dataDepense);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET ALL DEPENSES
const getAllDepenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataDepenses = yield getDepenseModel().findAll();
        return res.json(dataDepenses);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE DEPENSE BY ID
const deleteDepenseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataDepense = yield getDepenseModel().findByPk(id);
        if (!dataDepense) {
            return res.json({ message: messageDepenseNotFound });
        }
        yield dataDepense.destroy();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE ALL DEPENSES
const deleteAllDepenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield getDepenseModel().drop();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//DATA ROUTES EXPORTED
const depensesCtrl = {
    createDepense,
    getAllDepenses,
    deleteDepenseById,
    deleteAllDepenses,
};
exports.default = depensesCtrl;
