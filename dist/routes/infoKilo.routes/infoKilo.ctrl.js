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
const getInfoKiloModel = () => {
    return connexionBd_1.default.getSequelizeDb().models.Info_kilo;
};
const messageInfoKiloNotFound = "Cet info sur le kilo n'éxiste pas.";
//TODO CREATE INFO_KILO
const createInfoKilo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataInfoKilo = yield getInfoKiloModel().create(Object.assign({}, req.body));
        return res.status(201).json(dataInfoKilo);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET INFO_KILO
const getInfoKilo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataInfoKilo = yield getInfoKiloModel().findAll({ limit: 1 });
        return res.json(dataInfoKilo);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO UPDATE INFO_KILO BY ID
const updateInfoKiloById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataInfoKilo = yield getInfoKiloModel().findByPk(id);
        if (!dataInfoKilo) {
            return res.json({ message: messageInfoKiloNotFound });
        }
        const infoKiloUpdated = yield dataInfoKilo.update(Object.assign({}, req.body), { where: { id: id } });
        return res.json(infoKiloUpdated);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE INFO_KILO BY ID
const deleteInfoKiloById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataInfoKilo = yield getInfoKiloModel().findByPk(id);
        if (!dataInfoKilo) {
            return res.json({ message: messageInfoKiloNotFound });
        }
        yield dataInfoKilo.destroy();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//DATA ROUTES EXPORTED
const infoKiloCtrl = {
    createInfoKilo,
    getInfoKilo,
    updateInfoKiloById,
    deleteInfoKiloById,
};
exports.default = infoKiloCtrl;
