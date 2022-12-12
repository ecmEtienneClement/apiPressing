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
const sequelize_1 = require("sequelize");
const admin_model_1 = __importDefault(require("./admin.model"));
const client_model_1 = __importDefault(require("./client.model"));
const compteBloque_model_1 = __importDefault(require("./compteBloque.model"));
const demandeDepense_model_1 = __importDefault(require("./demandeDepense.model"));
const depense_model_1 = __importDefault(require("./depense.model"));
const detailPiece_model_1 = __importDefault(require("./detailPiece.model"));
const detailTypeKilo_model_1 = __importDefault(require("./detailTypeKilo.model"));
const employe_model_1 = __importDefault(require("./employe.model"));
const etatFinancier_model_1 = __importDefault(require("./etatFinancier.model"));
const facture_model_1 = __importDefault(require("./facture.model"));
const infoKilo_model_1 = __importDefault(require("./infoKilo.model"));
const infoPiece_model_1 = __importDefault(require("./infoPiece.model"));
const linge_model_1 = __importDefault(require("./linge.model"));
const typeLinge_model_1 = __importDefault(require("./typeLinge.model"));
//
exports.default = (sequelize) => __awaiter(void 0, void 0, void 0, function* () {
    const dataAllPromise = yield Promise.all([
        (0, admin_model_1.default)(sequelize, sequelize_1.DataTypes),
        (0, client_model_1.default)(sequelize, sequelize_1.DataTypes),
        (0, compteBloque_model_1.default)(sequelize, sequelize_1.DataTypes),
        (0, demandeDepense_model_1.default)(sequelize, sequelize_1.DataTypes),
        (0, depense_model_1.default)(sequelize, sequelize_1.DataTypes),
        (0, detailPiece_model_1.default)(sequelize, sequelize_1.DataTypes),
        (0, detailTypeKilo_model_1.default)(sequelize, sequelize_1.DataTypes),
        (0, employe_model_1.default)(sequelize, sequelize_1.DataTypes),
        (0, etatFinancier_model_1.default)(sequelize, sequelize_1.DataTypes),
        (0, facture_model_1.default)(sequelize, sequelize_1.DataTypes),
        (0, infoKilo_model_1.default)(sequelize, sequelize_1.DataTypes),
        (0, infoPiece_model_1.default)(sequelize, sequelize_1.DataTypes),
        (0, linge_model_1.default)(sequelize, sequelize_1.DataTypes),
        (0, typeLinge_model_1.default)(sequelize, sequelize_1.DataTypes),
    ]);
    if (dataAllPromise) {
        return setRelationsModels(sequelize);
    }
    else {
        return false;
    }
});
//
function setRelationsModels(sequelize) {
    return __awaiter(this, void 0, void 0, function* () {
        //MODELS
        const adminModel = sequelize.models.Admin;
        const employerModel = sequelize.models.Employe;
        const factureModel = sequelize.models.Facture;
        const compteBloquerModel = sequelize.models.Compte_bloquer;
        const demandeDepenseModel = sequelize.models.Demande_depense;
        const depenseModel = sequelize.models.Depense;
        const clientModel = sequelize.models.Client;
        const lingeModel = sequelize.models.Linge;
        const typeLingeModel = sequelize.models.Type_linge;
        const detailTypeKiloModel = sequelize.models.Detail_type_kilo;
        const detailTypePieceModel = sequelize.models.Detail_type_piece;
        try {
            //TODO RELATION ADMIN
            //ADMIN  <== EMPLOYER
            adminModel.hasMany(employerModel, {
                foreignKey: { allowNull: false },
            });
            employerModel.belongsTo(adminModel);
            //ADMIN  <== FACTURE
            adminModel.hasMany(factureModel, {
                foreignKey: { allowNull: false },
            });
            factureModel.belongsTo(adminModel);
            //ADMIN  <== COMPTE_BLOQUER
            adminModel.hasMany(compteBloquerModel, {
                foreignKey: { allowNull: true },
            });
            compteBloquerModel.belongsTo(adminModel);
            //ADMIN  <== DEMANDE_DEPENSE
            adminModel.hasMany(demandeDepenseModel, {
                foreignKey: { allowNull: true },
            });
            demandeDepenseModel.belongsTo(adminModel);
            //TODO RELATION EMPLOYER
            //EMPLOYER  <== DEMANDE_DEPENSE
            employerModel.hasMany(demandeDepenseModel, {
                foreignKey: { allowNull: false },
            });
            demandeDepenseModel.belongsTo(employerModel);
            //EMPLOYER  <== LINGE
            employerModel.hasMany(lingeModel, {
                foreignKey: { allowNull: false },
            });
            lingeModel.belongsTo(employerModel);
            //EMPLOYER  <== CLIENT
            employerModel.hasMany(clientModel, {
                foreignKey: { allowNull: false },
            });
            clientModel.belongsTo(employerModel);
            //EMPLOYER  <== COMPTE_BLOQUER
            employerModel.hasOne(compteBloquerModel, {
                foreignKey: { allowNull: false },
            });
            compteBloquerModel.belongsTo(employerModel);
            //TODO RELATION DEMANDE_DEPENSE
            //DEMANDE_DEPENSE  <== DEPENSE
            demandeDepenseModel.hasOne(depenseModel, {
                foreignKey: { allowNull: false },
            });
            depenseModel.belongsTo(demandeDepenseModel);
            //TODO RELATION CLIENT
            //CLIENT  <== LINGE
            clientModel.hasMany(lingeModel, {
                foreignKey: { allowNull: false },
            });
            lingeModel.belongsTo(clientModel);
            //TODO RELATION TYPE LINGE
            //TYPE LINGE  <== LINGE
            typeLingeModel.hasMany(lingeModel, {
                foreignKey: { allowNull: false },
            });
            lingeModel.belongsTo(typeLingeModel);
            //DETAIL_TYPE_KILO  ==> LINGE
            lingeModel.hasOne(detailTypeKiloModel, {
                foreignKey: { allowNull: false },
            });
            detailTypeKiloModel.belongsTo(lingeModel);
            //DETAIL_TYPE_PIECE  ==> LINGE
            lingeModel.hasMany(detailTypePieceModel, {
                foreignKey: { allowNull: false },
            });
            detailTypePieceModel.belongsTo(lingeModel);
            return true;
        }
        catch (error) {
            console.log("Une erreur c'est produite l'or de la mise en place des relations : \n" +
                error);
            return false;
        }
    });
}
