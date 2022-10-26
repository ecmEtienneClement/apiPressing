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
const getDetailPieceModel = () => {
    return connexionBd_1.default.getSequelizeDb().models.Detail_piece;
};
const messageDetailPieceNotFound = "Ce détail de piece n'éxiste pas.";
//TODO CREATE DETAIL_PIECE
const createDetailPiece = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataDetailPieceModel = yield getDetailPieceModel().create(Object.assign({}, req.body));
        return res.status(201).json(dataDetailPieceModel);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO UPDATE DETAIL_PIECE BY ID
const updateDetailPieceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataDetailPieceModel = yield getDetailPieceModel().findByPk(id);
        if (!dataDetailPieceModel) {
            return res.json({ message: messageDetailPieceNotFound });
        }
        const detailPieceUpdated = yield dataDetailPieceModel.update(Object.assign({}, req.body), { where: { id: id } });
        return res.json(detailPieceUpdated);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE DETAIL_PIECE BY ID
const deleteDetailPieceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataDetailPieceModel = yield getDetailPieceModel().findByPk(id);
        if (!dataDetailPieceModel) {
            return res.json({ message: messageDetailPieceNotFound });
        }
        yield dataDetailPieceModel.destroy();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//DATA ROUTES EXPORTED
const detailPiecesCtrl = {
    createDetailPiece,
    updateDetailPieceById,
    deleteDetailPieceById,
};
exports.default = detailPiecesCtrl;
