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
const getEtatFinancierModel = () => {
    return connexionBd_1.default.getSequelizeDb().models.Etat_financier;
};
const messageEtatFinancierNotFound = "Cet état financier n'éxiste pas.";
//TODO CREATE ETAT_FINANCIER
const createEtatFinancier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataEtatFinancierModel = yield getEtatFinancierModel().create(Object.assign({}, req.body));
        return res.status(201).json(dataEtatFinancierModel);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET ETAT_FINANCIER
const getEtatFinancier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataEtatFinancierModel = yield getEtatFinancierModel().findAll({
            limit: 1,
        });
        return res.json(dataEtatFinancierModel);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO UPDATE ETAT_FINANCIER BY ID
const updateEtatFinancierById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataEtatFinancierModel = yield getEtatFinancierModel().findByPk(id);
        if (!dataEtatFinancierModel) {
            return res.json({ message: messageEtatFinancierNotFound });
        }
        const etatFinancierUpdated = yield dataEtatFinancierModel.update(Object.assign({}, req.body), { where: { id: id } });
        return res.json(etatFinancierUpdated);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE  ETAT_FINANCIER
const deleteEtatFinancier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield getEtatFinancierModel().drop();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//DATA ROUTES EXPORTED
const etatFinancierCtrl = {
    createEtatFinancier,
    getEtatFinancier,
    updateEtatFinancierById,
    deleteEtatFinancier,
};
exports.default = etatFinancierCtrl;
