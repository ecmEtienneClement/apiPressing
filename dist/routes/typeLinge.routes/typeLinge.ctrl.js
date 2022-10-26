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
const getTypeLingeModel = () => {
    return connexionBd_1.default.getSequelizeDb().models.Type_linge;
};
const messageTypeLingeNotFound = "Ce type de linge n'éxiste pas.";
//TODO CREATE TYPE_LINGE
const createTypeLinge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataTypeLinge = yield getTypeLingeModel().create(Object.assign({}, req.body));
        return res.status(201).json(dataTypeLinge);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET TYPE_LINGE
const getTypeLinge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataTypeLinge = yield getTypeLingeModel().findAll({ limit: 1 });
        return res.json(dataTypeLinge);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO UPDATE TYPE_LINGE BY ID
const updateTypeLingeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataTypeLinge = yield getTypeLingeModel().findByPk(id);
        if (!dataTypeLinge) {
            return res.json({ message: messageTypeLingeNotFound });
        }
        const typeLingeUpdated = yield dataTypeLinge.update(Object.assign({}, req.body), { where: { id: id } });
        return res.json(typeLingeUpdated);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE TYPE_LINGE BY ID
const deleteTypeLingeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataTypeLinge = yield getTypeLingeModel().findByPk(id);
        if (!dataTypeLinge) {
            return res.json({ message: messageTypeLingeNotFound });
        }
        yield dataTypeLinge.destroy();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//DATA ROUTES EXPORTED
const typeLingeCtrl = {
    createTypeLinge,
    getTypeLinge,
    updateTypeLingeById,
    deleteTypeLingeById,
};
exports.default = typeLingeCtrl;
