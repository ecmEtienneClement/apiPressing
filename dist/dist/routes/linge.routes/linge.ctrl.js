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
    return connexionBd_1.default.modelsList.get(namingModelListe_1.NameModelsListe.linge);
};
const messageLingeNotFound = "Cet linge n'éxiste pas.";
//TODO CREATE LINGE
const createLinge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataLinge = yield getModels().create(Object.assign({}, req.body));
        return res.status(201).json(dataLinge);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET ALL LINGES
const getAllLinges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //
        const dataLinges = yield getModels().findAll({
            include: { all: true },
        });
        //
        return res.json(dataLinges);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET LINGE BY ID
const getLingeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = routes_helper_1.default.getParamId(req);
        //
        //
        const dataLinge = yield getModels().findByPk(id, {
            include: { all: true },
        });
        if (!dataLinge) {
            return res.status(404).json({ message: messageLingeNotFound });
        }
        //
        return res.json(dataLinge);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO UPDATE LINGE BY ID
const updateLingeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = routes_helper_1.default.getParamId(req);
        const dataLinge = yield getModels().findByPk(id);
        if (!dataLinge) {
            return res.status(404).json({ message: messageLingeNotFound });
        }
        //vrf OWNER
        const employerOwnerLinge = dataLinge.getDataValue("EmployeId");
        routes_helper_1.default.vrfUserOwner(req, employerOwnerLinge, true);
        //
        yield dataLinge.update(Object.assign({}, req.body), { where: { id: id } });
        return getLingeById(req, res);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE LINGE BY ID
const deleteLingeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = routes_helper_1.default.getParamId(req);
        const dataLinge = yield getModels().findByPk(id);
        if (!dataLinge) {
            return res.status(404).json({ message: messageLingeNotFound });
        }
        //vrf OWNER
        const employerOwnerLinge = dataLinge.getDataValue("EmployeId");
        routes_helper_1.default.vrfUserOwner(req, employerOwnerLinge, true);
        //
        yield dataLinge.destroy();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE ALL LINGES
const deleteAllLinges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield getModels().drop();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//DATA ROUTES EXPORTED
const lingesCtrl = {
    createLinge,
    getAllLinges,
    getLingeById,
    updateLingeById,
    deleteLingeById,
    deleteAllLinges,
};
exports.default = lingesCtrl;
