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
const getLingeModel = () => {
    return connexionBd_1.default.getSequelizeDb().models.Linge;
};
const messageLingeNotFound = "Cet linge n'éxiste pas.";
//TODO CREATE LINGE
const createLinge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataLinge = yield getLingeModel().create(Object.assign({}, req.body));
        return res.status(201).json(dataLinge);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET ALL LINGES
const getAllLinges = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataLinges = yield getLingeModel().findAll();
        return res.json(dataLinges);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET LINGE BY ID
const getLingeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataLinge = yield getLingeModel().findByPk(id);
        return dataLinge
            ? res.json(dataLinge)
            : res.json({ message: messageLingeNotFound });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO UPDATE LINGE BY ID
const updateLingeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataLinge = yield getLingeModel().findByPk(id);
        if (!dataLinge) {
            return res.json({ message: messageLingeNotFound });
        }
        const adminUpdated = yield dataLinge.update(Object.assign({}, req.body), { where: { id: id } });
        return res.json(adminUpdated);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE LINGE BY ID
const deleteLingeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataLinge = yield getLingeModel().findByPk(id);
        if (!dataLinge) {
            return res.json({ message: messageLingeNotFound });
        }
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
        yield getLingeModel().drop();
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
