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
    return connexionBd_1.default.modelsList.get(namingModelListe_1.NameModelsListe.admin);
};
const messageAdminNotFound = "Cet administrateur n'éxiste pas.";
//TODO CREATE ADMIN
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield routes_helper_1.default.vrfEmailAdmin(req);
        const pwdHash = yield routes_helper_1.default.getHashPwd(req);
        const dataAdmin = yield getModels().create(Object.assign(Object.assign({}, req.body), { mdp: pwdHash }));
        return res.status(201).json(dataAdmin);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET ALL ADMINS
const getAllAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //
        const dataAdmins = yield getModels().findAll({
            include: { all: true },
        });
        //
        return res.json(dataAdmins);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET ADMIN BY ID
const getAdminById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = routes_helper_1.default.getParamId(req);
        //
        const dataAdmin = yield getModels().findByPk(id, {
            include: { all: true },
        });
        return dataAdmin
            ? res.json(dataAdmin)
            : res.status(404).json({ message: messageAdminNotFound });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO UPDATE ADMIN BY ID
const updateAdminById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = routes_helper_1.default.getParamId(req);
        const dataAdmin = yield getModels().findByPk(id);
        if (!dataAdmin) {
            return res.status(404).json({ message: messageAdminNotFound });
        }
        //vrf OWNER
        const idAdminOwnerData = dataAdmin.getDataValue("id");
        routes_helper_1.default.vrfUserOwner(req, idAdminOwnerData, false);
        //
        yield dataAdmin.update(Object.assign({}, req.body), { where: { id: id } });
        return getAdminById(req, res);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE ADMIN BY ID
const deleteAdminById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = routes_helper_1.default.getParamId(req);
        const dataAdmin = yield getModels().findByPk(id);
        if (!dataAdmin) {
            return res.status(404).json({ message: messageAdminNotFound });
        }
        //vrf OWNER
        const idAdminOwnerData = dataAdmin.getDataValue("id");
        routes_helper_1.default.vrfUserOwner(req, idAdminOwnerData, false);
        //
        yield dataAdmin.destroy();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE ALL ADMINS
const deleteAllAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield getModels().drop();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//DATA ROUTES EXPORTED
const adminsCtrl = {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdminById,
    deleteAdminById,
    deleteAllAdmins,
};
exports.default = adminsCtrl;
