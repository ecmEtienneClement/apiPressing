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
exports.InsertDataInitDb = void 0;
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
class InsertDataInitDb {
    //TODO
    static initialiseurDefaultData(sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                InsertDataInitDb.iniDefaultAdmin(sequelize),
                InsertDataInitDb.iniDefaultEtatFinancier(sequelize),
                InsertDataInitDb.iniDefaultTypeLinge(sequelize),
                InsertDataInitDb.iniDefaultInfoKilo(sequelize),
                InsertDataInitDb.iniDefaultInfoPiece(sequelize),
            ]);
        });
    }
    //TODO
    static iniDefaultAdmin(sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            const modelDefaultAdmin = sequelize.models.Admin;
            const dataDefautlAdmin = yield modelDefaultAdmin.findOne({
                where: {
                    email: "ecmbayeclement@gmail.com",
                },
            });
            if (!dataDefautlAdmin) {
                try {
                    //HASH
                    const salt = yield bcrypt_1.default.genSalt(10);
                    const pwdHash = yield bcrypt_1.default.hash("Firstadmin01", salt);
                    yield modelDefaultAdmin.create({
                        nom: "MBAYE",
                        prenom: "Etienne Clement",
                        email: "ecmbayeclement@gmail.com",
                        numero: "777777777",
                        mdp: pwdHash,
                    });
                }
                catch (error) {
                    throw new Error("Une erreut c'est produite avec les default type de linge " + error);
                }
            }
        });
    }
    //TODO
    static iniDefaultEtatFinancier(sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            const modelDefaultEtatFinancier = sequelize.models.Etat_financier;
            const dataDefautlEtatFinancier = yield modelDefaultEtatFinancier.findAll({
                limit: 1,
            });
            if (dataDefautlEtatFinancier.length < 1) {
                try {
                    yield modelDefaultEtatFinancier.create({
                        caisse: 0,
                        depense: 0,
                    });
                }
                catch (error) {
                    throw new Error("Une erreut c'est produite avec le default etat financier " + error);
                }
            }
        });
    }
    //TODO
    static iniDefaultTypeLinge(sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            const modelDefaultTypeLinge = sequelize.models.Type_linge;
            const dataDefautlTypeLinge = yield modelDefaultTypeLinge.findOne({
                where: { [sequelize_1.Op.or]: [{ nom: "Kilo" }, { nom: "Piece" }] },
            });
            if (!dataDefautlTypeLinge) {
                try {
                    Promise.all([
                        yield modelDefaultTypeLinge.create({
                            nom: "kilo",
                        }),
                        yield modelDefaultTypeLinge.create({
                            nom: "Piece",
                        }),
                    ]);
                }
                catch (error) {
                    throw new Error("Une erreut c'est produite avec les default type de linge " + error);
                }
            }
        });
    }
    //TODO
    static iniDefaultInfoKilo(sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            const modelDefaultInfoKilo = sequelize.models.Info_kilo;
            const dataDefautlInfoKilo = yield modelDefaultInfoKilo.findAll({
                limit: 1,
            });
            if (dataDefautlInfoKilo.length < 1) {
                try {
                    yield modelDefaultInfoKilo.create({
                        prixLinge: 0,
                        prixRepassage: 0,
                    });
                }
                catch (error) {
                    throw new Error("Une erreut c'est produite avec le default info kilo " + error);
                }
            }
        });
    }
    //TODO
    static iniDefaultInfoPiece(sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            const modelDefaultInfoPiece = sequelize.models.Info_piece;
            const dataDefautlInfoPiece = yield modelDefaultInfoPiece.findAll({
                limit: 1,
            });
            if (dataDefautlInfoPiece.length < 1) {
                try {
                    Promise.all([
                        yield modelDefaultInfoPiece.create({
                            nom: "Chemise",
                            prixLinge: 0,
                            prixRepassage: 0,
                        }),
                        yield modelDefaultInfoPiece.create({
                            nom: "Combinaison",
                            prixLinge: 0,
                            prixRepassage: 0,
                        }),
                        yield modelDefaultInfoPiece.create({
                            nom: "Gilet",
                            prixLinge: 0,
                            prixRepassage: 0,
                        }),
                        yield modelDefaultInfoPiece.create({
                            nom: "Jeans",
                            prixLinge: 0,
                            prixRepassage: 0,
                        }),
                        yield modelDefaultInfoPiece.create({
                            nom: "Jupe",
                            prixLinge: 0,
                            prixRepassage: 0,
                        }),
                        yield modelDefaultInfoPiece.create({
                            nom: "Joggin",
                            prixLinge: 0,
                            prixRepassage: 0,
                        }),
                        yield modelDefaultInfoPiece.create({
                            nom: "Pull",
                            prixLinge: 0,
                            prixRepassage: 0,
                        }),
                        yield modelDefaultInfoPiece.create({
                            nom: "Tee-shirt",
                            prixLinge: 0,
                            prixRepassage: 0,
                        }),
                        yield modelDefaultInfoPiece.create({
                            nom: "Veste",
                            prixLinge: 0,
                            prixRepassage: 0,
                        }),
                        yield modelDefaultInfoPiece.create({
                            nom: "Manteau",
                            prixLinge: 0,
                            prixRepassage: 0,
                        }),
                        yield modelDefaultInfoPiece.create({
                            nom: "Robe",
                            prixLinge: 0,
                            prixRepassage: 0,
                        }),
                        yield modelDefaultInfoPiece.create({
                            nom: "Blouse",
                            prixLinge: 0,
                            prixRepassage: 0,
                        }),
                    ]);
                }
                catch (error) {
                    throw new Error("Une erreut c'est produite avec le default info piece " + error);
                }
            }
        });
    }
}
exports.InsertDataInitDb = InsertDataInitDb;
