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
const getCompteBloqueModel = () => {
    return connexionBd_1.default.getSequelizeDb().models.Compte_bloquer;
};
const messageCompteBloquerNotFound = "Cet [compte_bloquer] n'éxiste pas.";
//TODO CREATE COMPTE_BLOQUER
const createCompteBloquer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataCompteBloquer = yield getCompteBloqueModel().create(Object.assign({}, req.body));
        return res.status(201).json(dataCompteBloquer);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET ALL COMPTE_BLOQUERS
const getAllCompteBloquer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataCompteBloquer = yield getCompteBloqueModel().findAll();
        return res.json(dataCompteBloquer);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET COMPTE_BLOQUER BY EMAIL
const getCompteBloquerByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = routes_helper_1.default.getParamEmail(req);
    try {
        const dataCompteBloquer = yield getCompteBloqueModel().findOne({
            where: {
                email: email,
            },
        });
        if (dataCompteBloquer) {
            if (dataCompteBloquer.getDataValue("byAdmin")) {
                return res.json({
                    looked: true,
                    byAdmin: true,
                });
            }
            else {
                return res.json({
                    looked: true,
                    byAdmin: false,
                });
            }
        }
        else {
            return res.json(false);
        }
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE COMPTE_BLOQUER BY ID
const deleteCompteBloquerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataCompteBloquer = yield getCompteBloqueModel().findByPk(id);
        if (!dataCompteBloquer) {
            return res.json({ message: messageCompteBloquerNotFound });
        }
        yield dataCompteBloquer.destroy();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//DATA ROUTES EXPORTED
const compteBloquerCtrl = {
    createCompteBloquer,
    getAllCompteBloquer,
    getCompteBloquerByEmail,
    deleteCompteBloquerById,
};
exports.default = compteBloquerCtrl;
