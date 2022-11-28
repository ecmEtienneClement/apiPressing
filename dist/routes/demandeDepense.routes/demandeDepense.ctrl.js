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
    return connexionBd_1.default.modelsList.get(namingModelListe_1.NameModelsListe.dmdDepense);
};
const messageDemandeDepenseNotFound = "Cette demande de dépense n'éxiste pas.";
//TODO CREATE DEMANDE_DEPENSE
const createDemandeDepense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataDemandeDepense = yield getModels().create(Object.assign({}, req.body));
        return res.status(201).json(dataDemandeDepense);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET ALL DEMANDE_DEPENSES
const getAllDemandeDepenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //
        const dataDemandeDepenses = yield getModels().findAll({
            include: { all: true },
        });
        //
        return res.json(dataDemandeDepenses);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET DEMANDE_DEPENSE BY ID
const getDemandeDepenseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = routes_helper_1.default.getParamId(req);
        //
        const dataDemandeDepense = yield getModels().findByPk(id, {
            include: { all: true },
        });
        //
        if (!dataDemandeDepense) {
            return res.status(404).json({ message: messageDemandeDepenseNotFound });
        }
        //vrf OWNER
        const employerOwnerDmdDepense = dataDemandeDepense.getDataValue("EmployeId");
        routes_helper_1.default.vrfUserOwner(req, employerOwnerDmdDepense, true);
        //
        return res.json(dataDemandeDepense);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO UPDATE DEMANDE_DEPENSE BY ID
const updateDemandeDepenseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = routes_helper_1.default.getParamId(req);
        const dataDemandeDepense = yield getModels().findByPk(id);
        if (!dataDemandeDepense) {
            return res.status(404).json({ message: messageDemandeDepenseNotFound });
        }
        //vrf OWNER
        const employerOwnerDmdDepense = dataDemandeDepense.getDataValue("EmployeId");
        routes_helper_1.default.vrfUserOwner(req, employerOwnerDmdDepense, false);
        //
        const DemandeDepenseUpdated = yield dataDemandeDepense.update(Object.assign({}, req.body), { where: { id: id } });
        return res.json(DemandeDepenseUpdated);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE DEMANDE_DEPENSE BY ID
const deleteDemandeDepenseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = routes_helper_1.default.getParamId(req);
        const dataDemandeDepense = yield getModels().findByPk(id);
        if (!dataDemandeDepense) {
            return res.status(404).json({ message: messageDemandeDepenseNotFound });
        }
        //vrf OWNER
        const employerOwnerDmdDepense = dataDemandeDepense.getDataValue("EmployeId");
        routes_helper_1.default.vrfUserOwner(req, employerOwnerDmdDepense, false);
        //
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
        yield getModels().drop();
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
