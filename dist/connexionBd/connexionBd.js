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
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = require("process");
const sequelize_1 = require("sequelize");
const initModels_1 = __importDefault(require("../models/initModels"));
dotenv_1.default.config();
class ConnexionBd {
    //TODO
    static getSequelizeDb() {
        return this.sequelizeDb;
    }
    //TODO
    static setSequelizeDb(sequelize) {
        this.sequelizeDb = sequelize;
    }
    //TODO
    static connexionBdDev() {
        return __awaiter(this, void 0, void 0, function* () {
            const sequelize = new sequelize_1.Sequelize(process_1.env.bdName, process_1.env.user, process_1.env.pwd, {
                host: process_1.env.host,
                dialect: "mysql",
            });
            try {
                yield sequelize.authenticate();
                console.log("[mode dev] Connexion à la BD réussit.");
                //Init Models
                const dataBoolean = yield (0, initModels_1.default)(sequelize);
                console.log("==========>" + dataBoolean);
                if (dataBoolean) {
                    sequelize
                        .sync({ force: true })
                        .then((dataSequelize) => {
                        this.setSequelizeDb(dataSequelize);
                        console.log("Le BD a été bien instancié.");
                    })
                        .catch((error) => {
                        console.log("Une erreur c'est produite l'or de la synchronisation de la BD : " +
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
