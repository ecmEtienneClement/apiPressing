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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = require("process");
const sequelize_1 = require("sequelize");
const initModels_1 = __importDefault(require("../models/initModels"));
const namingModelListe_1 = require("../models/namingModelListe");
const insertDataInitDb_1 = require("./insertDataInitDb");
dotenv_1.default.config();
class ConnexionBd {
    //TODO
    static connexionBdDev() {
        return __awaiter(this, void 0, void 0, function* () {
            const sequelize = new sequelize_1.Sequelize(process_1.env.BD_NAME, process_1.env.BD_USER, process_1.env.BD_PWD, {
                host: process_1.env.HOST,
                dialect: "mysql",
            });
            try {
                yield sequelize.authenticate();
                console.log("[mode dev] Connexion à la BD réussit.");
                //Init Models
                const dataBoolean = yield (0, initModels_1.default)(sequelize);
                if (dataBoolean) {
                    sequelize
                        .sync({ force: false })
                        .then((dataSequelize) => {
                        insertDataInitDb_1.InsertDataInitDb.initialiseurDefaultData(dataSequelize)
                            .then(() => {
                            this.initModelsList(dataSequelize);
                            console.log("[mode dev] La BD a été bien instanciée.");
                        })
                            .catch((error) => {
                            console.log("[mode dev] erreur init " + error);
                        });
                    })
                        .catch((error) => {
                        console.log("[mode dev] Une erreur c'est produite l'or de la synchronisation de la BD : " +
                            error);
                    });
                }
            }
            catch (error) {
                console.log("[mode dev] Une erreu s'est produite l'or de la connexion à la BD :\n" +
                    error);
            }
        });
    }
}
exports.default = ConnexionBd;
_a = ConnexionBd;
ConnexionBd.modelsList = new Map();
//TODO INIT MODELS_LIST
ConnexionBd.initModelsList = (sequelize) => {
    const employers = sequelize.models.Employe;
    const admins = sequelize.models.Admin;
    const factures = sequelize.models.Facture;
    const depense = sequelize.models.Depense;
    const demandeDepenses = sequelize.models.Demande_depense;
    const compteBloquers = sequelize.models.Compte_bloquer;
    const clients = sequelize.models.Client;
    const linges = sequelize.models.Linge;
    const typeLinge = sequelize.models.Type_linge;
    const infoKilo = sequelize.models.Info_kilo;
    const infoPiece = sequelize.models.Info_piece;
    const detailTypeKilo = sequelize.models.Detail_type_kilo;
    const detailTypePiece = sequelize.models.Detail_type_piece;
    //
    _a.modelsList.set(namingModelListe_1.NameModelsListe.admin, admins);
    _a.modelsList.set(namingModelListe_1.NameModelsListe.facture, factures);
    _a.modelsList.set(namingModelListe_1.NameModelsListe.employer, employers);
    _a.modelsList.set(namingModelListe_1.NameModelsListe.dmdDepense, demandeDepenses);
    _a.modelsList.set(namingModelListe_1.NameModelsListe.depense, depense);
    _a.modelsList.set(namingModelListe_1.NameModelsListe.cmpBloquer, compteBloquers);
    _a.modelsList.set(namingModelListe_1.NameModelsListe.client, clients);
    _a.modelsList.set(namingModelListe_1.NameModelsListe.linge, linges);
    _a.modelsList.set(namingModelListe_1.NameModelsListe.infoKilo, infoKilo);
    _a.modelsList.set(namingModelListe_1.NameModelsListe.infoPiece, infoPiece);
    _a.modelsList.set(namingModelListe_1.NameModelsListe.typeLinge, typeLinge);
    _a.modelsList.set(namingModelListe_1.NameModelsListe.detailTypeKilo, detailTypeKilo);
    _a.modelsList.set(namingModelListe_1.NameModelsListe.detailTypePiece, detailTypePiece);
};
