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
//
const getEmployerModel = () => {
    return connexionBd_1.default.getSequelizeDb().models.Employe;
};
const getAdminModel = () => {
    return connexionBd_1.default.getSequelizeDb().models.Admin;
};
const messageAdminNotFound = "Cet administrateur n'éxiste pas.";
const messageEmployerNotFound = "Cet employé n'éxiste pas.";
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //
    const email = req.body.email;
    const isAdmin = email.startsWith("#");
    //
    const modelAdminOrEmployer = isAdmin ? getAdminModel() : getEmployerModel();
    const messageUserNotFound = isAdmin
        ? messageAdminNotFound
        : messageEmployerNotFound;
    //
    try {
        const dataEmployerOrAdmin = yield modelAdminOrEmployer.findOne({
            where: { email: email },
        });
        if (!dataEmployerOrAdmin) {
            return res.json({ message: messageUserNotFound });
        }
    }
    catch (error) { }
});
