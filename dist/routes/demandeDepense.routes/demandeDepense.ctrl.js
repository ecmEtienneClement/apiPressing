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
const getDemandeDepenseModel = () => {
    return connexionBd_1.default.getSequelizeDb().models.Demande_depense;
};
const messageDemandeDepenseNotFound = "Cette demande de dépense n'éxiste pas.";
//TODO CREATE DEMANDE_DEPENSE
const createDemandeDepense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataDemandeDepense = yield getDemandeDepenseModel().create(Object.assign({}, req.body));
        return res.status(201).json(dataDemandeDepense);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET ALL DEMANDE_DEPENSES
const getAllDemandeDepenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataDemandeDepenses = yield getDemandeDepenseModel().findAll();
        return res.json(dataDemandeDepenses);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET DEMANDE_DEPENSE BY ID
const getDemandeDepenseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataDemandeDepense = yield getDemandeDepenseModel().findByPk(id);
        return dataDemandeDepense
            ? res.json(dataDemandeDepense)
            : res.json({ message: messageDemandeDepenseNotFound });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO UPDATE DEMANDE_DEPENSE BY ID
const updateDemandeDepenseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataDemandeDepense = yield getDemandeDepenseModel().findByPk(id);
        if (!dataDemandeDepense) {
            return res.json({ message: messageDemandeDepenseNotFound });
        }
        const DemandeDepenseUpdated = yield dataDemandeDepense.update(Object.assign({}, req.body), { where: { id: id } });
        return res.json(DemandeDepenseUpdated);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE DEMANDE_DEPENSE BY ID
const deleteDemandeDepenseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataDemandeDepense = yield getDemandeDepenseModel().findByPk(id);
        if (!dataDemandeDepense) {
            return res.json({ message: messageDemandeDepenseNotFound });
        }
        yield dataDemandeDepense.destroy();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE ALL DEMANDE_DEPENSES
const deleteAllDemandeDepenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield getDemandeDepenseModel().drop();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//DATA ROUTES EXPORTED
const demandeDepensesCtrl = {
    createDemandeDepense,
    getAllDemandeDepenses,
    getDemandeDepenseById,
    updateDemandeDepenseById,
    deleteDemandeDepenseById,
    deleteAllDemandeDepenses,
};
exports.default = demandeDepensesCtrl;
