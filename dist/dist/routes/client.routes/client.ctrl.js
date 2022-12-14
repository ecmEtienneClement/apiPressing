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
    return connexionBd_1.default.modelsList.get(namingModelListe_1.NameModelsListe.client);
};
const messageClientNotFound = "Cet client n'éxiste pas.";
//TODO CREATE CLIENT
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataClient = yield getModels().create(Object.assign({}, req.body));
        return res.status(201).json(dataClient);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET ALL CLIENTS
const getAllClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataClients = yield getModels().findAll({
            include: { all: true },
        });
        return res.json(dataClients);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET CLIENT BY ID
const getClientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = routes_helper_1.default.getParamId(req);
        //
        const dataClient = yield getModels().findByPk(id, {
            include: { all: true },
        });
        //
        return dataClient
            ? res.json(dataClient)
            : res.status(404).json({ message: messageClientNotFound });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO UPDATE CLIENT BY ID
const updateClientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = routes_helper_1.default.getParamId(req);
        const dataClient = yield getModels().findByPk(id);
        if (!dataClient) {
            return res.status(404).json({ message: messageClientNotFound });
        }
        //
        const employerOwnerClient = dataClient.getDataValue("EmployeId");
        routes_helper_1.default.vrfUserOwner(req, employerOwnerClient, true);
        //
        yield dataClient.update(Object.assign({}, req.body), { where: { id: id } });
        return getClientById(req, res);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE CLIENT BY ID
const deleteClientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = routes_helper_1.default.getParamId(req);
        const dataClient = yield getModels().findByPk(id);
        if (!dataClient) {
            return res.status(404).json({ message: messageClientNotFound });
        }
        //vrf OWNER
        const employerOwnerClient = dataClient.getDataValue("EmployeId");
        routes_helper_1.default.vrfUserOwner(req, employerOwnerClient, true);
        //
        yield dataClient.destroy();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE ALL CLIENTS
const deleteAllClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield getModels().drop();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//DATA ROUTES EXPORTED
const clientsCtrl = {
    createClient,
    getAllClients,
    getClientById,
    updateClientById,
    deleteClientById,
    deleteAllClients,
};
exports.default = clientsCtrl;
