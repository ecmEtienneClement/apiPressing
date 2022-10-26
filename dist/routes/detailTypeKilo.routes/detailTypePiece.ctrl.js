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
const getDetailTypeKiloModel = () => {
    return connexionBd_1.default.getSequelizeDb().models.Detail_type_kilo;
};
const messageDetailTypeKiloNotFound = "Ce détail de type kilo n'éxiste pas.";
//TODO CREATE DETAIL_TYPE_KILO
const createDetailTypeKilo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataDetailTypeKiloModel = yield getDetailTypeKiloModel().create(Object.assign({}, req.body));
        return res.status(201).json(dataDetailTypeKiloModel);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO UPDATE DETAIL_TYPE_KILO BY ID
const updateDetailTypeKiloById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataDetailTypeKiloModel = yield getDetailTypeKiloModel().findByPk(id);
        if (!dataDetailTypeKiloModel) {
            return res.json({ message: messageDetailTypeKiloNotFound });
        }
        const detailTypeKiloUpdated = yield dataDetailTypeKiloModel.update(Object.assign({}, req.body), { where: { id: id } });
        return res.json(detailTypeKiloUpdated);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE  DETAIL_TYPE_KILO
const deleteDetailTypeKilo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield getDetailTypeKiloModel().drop();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//DATA ROUTES EXPORTED
const detailTypeKiloCtrl = {
    createDetailTypeKilo,
    updateDetailTypeKiloById,
    deleteDetailTypeKilo,
};
exports.default = detailTypeKiloCtrl;
