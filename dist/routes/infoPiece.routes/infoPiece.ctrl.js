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
    return connexionBd_1.default.modelsList.get(namingModelListe_1.NameModelsListe.infoPiece);
};
const messageInfoPieceNotFound = "Cet info sur le piece n'éxiste pas.";
//TODO CREATE INFO_PIECE
const createInfoPiece = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataInfoPiece = yield getModels().create(Object.assign({}, req.body));
        return res.status(201).json(dataInfoPiece);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET INFO_PIECE
const getInfoPiece = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataInfoPiece = yield getModels().findAll();
        return res.json(dataInfoPiece);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO UPDATE INFO_PIECE BY ID
const updateInfoPieceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataInfoPiece = yield getModels().findByPk(id);
        if (!dataInfoPiece) {
            return res.status(404).json({ message: messageInfoPieceNotFound });
        }
        const infoPieceUpdated = yield dataInfoPiece.update(Object.assign({}, req.body), { where: { id: id } });
        return res.json(infoPieceUpdated);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE INFO_PIECE BY ID
const deleteInfoPieceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataInfoPiece = yield getModels().findByPk(id);
        if (!dataInfoPiece) {
            return res.status(404).json({ message: messageInfoPieceNotFound });
        }
        yield dataInfoPiece.destroy();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//DATA ROUTES EXPORTED
const infoPieceCtrl = {
    createInfoPiece,
    getInfoPiece,
    updateInfoPieceById,
    deleteInfoPieceById,
};
exports.default = infoPieceCtrl;
