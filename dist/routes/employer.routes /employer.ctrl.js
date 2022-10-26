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
const getEmployerModel = () => {
    return connexionBd_1.default.getSequelizeDb().models.Employe;
};
const messageEmployerNotFound = "Cet employé n'éxiste pas.";
//TODO CREATE EMPLOYER
const createEmployer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pwdHash = yield routes_helper_1.default.getHashPwd(req);
        const dataEmployer = yield getEmployerModel().create(Object.assign(Object.assign({}, req.body), { mdp: pwdHash }));
        return res.status(201).json(dataEmployer);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET ALL EMPLOYERS
const getAllEmployers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataEmployers = yield getEmployerModel().findAll();
        return res.json(dataEmployers);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO GET EMPLOYER BY ID
const getEmployerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataEmployer = yield getEmployerModel().findByPk(id);
        return dataEmployer
            ? res.json(dataEmployer)
            : res.json({ message: messageEmployerNotFound });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO UPDATE EMPLOYER BY ID
const updateEmployerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataEmployer = yield getEmployerModel().findByPk(id);
        if (!dataEmployer) {
            return res.json({ message: messageEmployerNotFound });
        }
        const employerUpdated = yield dataEmployer.update(Object.assign({}, req.body), { where: { id: id } });
        return res.json(employerUpdated);
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE EMPLOYER BY ID
const deleteEmployerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = routes_helper_1.default.getParamId(req);
    try {
        const dataEmployer = yield getEmployerModel().findByPk(id);
        if (!dataEmployer) {
            return res.json({ message: messageEmployerNotFound });
        }
        yield dataEmployer.destroy();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//TODO DELETE ALL EMPLOYERS
const deleteAllEmployers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield getEmployerModel().drop();
        return res.json({ deleted: true });
    }
    catch (error) {
        routes_errors_1.default.traitementErrorsReq(error, res);
    }
});
//DATA ROUTES EXPORTED
const employersCtrl = {
    createEmployer,
    getAllEmployers,
    getEmployerById,
    updateEmployerById,
    deleteEmployerById,
    deleteAllEmployers,
};
exports.default = employersCtrl;
