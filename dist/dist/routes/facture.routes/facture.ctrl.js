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
const namingModelListe_1 = require("../../models/namingModelListe");
const routes_errors_1 = __importDefault(require("../routes.errors"));
const routes_helper_1 = __importDefault(require("../routes.helper"));
//
const getModels = () => {
    return connexionBd_1.default.modelsList.get(namingModelListe_1.NameModelsListe.facture);
};
const messageFactureNotFound = "Cette facture n'éxiste pas.";
//TODO CREATE FACTURE
const createFacture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataFacture = yield getModels().create(Object.assign({}, req.body));
        return res.status(201).json(dataFacture);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET ALL FACTURES
const getAllFactures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //
        const dataFactures = yield getModels().findAll({
            include: { all: true },
        });
        //
        return res.json(dataFactures);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET FACTURE BY ID
const getFactureById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = routes_helper_1.default.getParamId(req);
        //
        const dataFacture = yield getModels().findByPk(id, {
            include: { all: true },
        });
        //
        return dataFacture
            ? res.json(dataFacture)
            : res.status(404).json({ message: messageFactureNotFound });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO UPDATE FACTURE BY ID
const updateFactureById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataFacture = yield getModels().findByPk(id);
        if (!dataFacture) {
            return res.status(404).json({ message: messageFactureNotFound });
        }
        yield dataFacture.update(Object.assign({}, req.body), { where: { id: id } });
        return getFactureById(req, res);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE FACTURE BY ID
const deleteFactureById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataFacture = yield getModels().findByPk(id);
        if (!dataFacture) {
            return res.status(404).json({ message: messageFactureNotFound });
        }
        yield dataFacture.destroy();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE ALL FACTURES
const deleteAllFactures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield getModels().drop();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//DATA ROUTES EXPORTED
const facturesCtrl = {
    createFacture,
    getAllFactures,
    getFactureById,
    updateFactureById,
    deleteFactureById,
    deleteAllFactures,
};
exports.default = facturesCtrl;
