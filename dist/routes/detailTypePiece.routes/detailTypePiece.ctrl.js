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
const getDetailTypePieceModel = () => {
    return connexionBd_1.default.getSequelizeDb().models.Detail_type_piece;
};
const messageDetailTypePieceNotFound = "Ce détail de type piece n'éxiste pas.";
//TODO CREATE DETAIL_TYPE_PIECE
const createDetailTypePiece = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataDetailTypePieceModel = yield getDetailTypePieceModel().create(Object.assign({}, req.body));
        return res.status(201).json(dataDetailTypePieceModel);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET DETAIL_TYPE_PIECE BY ID
const getDetailTypePieceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = routes_helper_1.default.getParamId(req);
        const detailPiece = connexionBd_1.default.getSequelizeDb().models.Detail_piece;
        const dataDetailTypePieceModel = yield getDetailTypePieceModel().findByPk(id, { include: [detailPiece] });
        if (!dataDetailTypePieceModel) {
            return res.status(404).json({ message: messageDetailTypePieceNotFound });
        }
        return res.json(dataDetailTypePieceModel);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE DETAIL_TYPE_PIECE BY ID
const deleteDetailTypePieceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = routes_helper_1.default.getParamId(req);
        const dataDetailTypePieceModel = yield getDetailTypePieceModel().findByPk(id);
        if (!dataDetailTypePieceModel) {
            return res.status(404).json({ message: messageDetailTypePieceNotFound });
        }
        yield dataDetailTypePieceModel.destroy();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//DATA ROUTES EXPORTED
const detailTypePiecesCtrl = {
    createDetailTypePiece,
    getDetailTypePieceById,
    deleteDetailTypePieceById,
};
exports.default = detailTypePiecesCtrl;
