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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, dataTypes) => __awaiter(void 0, void 0, void 0, function* () {
    sequelize.define("Linge", {
        //TODO
        id: {
            type: dataTypes.UUID,
            primaryKey: true,
        },
        //TODO
        prixLinge: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Le prix de linge ne peut étre vide.",
                },
                notNull: { msg: "Le prix de linge est requise." },
                isInt: { msg: "Le prix de linge est incorrecte." },
            },
        },
        //TODO
        payer: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        //TODO
        montantAvance: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: "Le montane de l'avance est incorrecte." },
            },
            defaultValue: 0,
        },
        //TODO
        livre: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        //TODO
        dataRetrait: {
            type: dataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        //TODO
        coordX: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: {
                Empty: {
                    msg: "Le coordonné de X ne peut étre vide.",
                },
                notNull: { msg: "Le coordonné de X est requise." },
                isInt: { msg: "Le coordonné de X est incorrecte." },
            },
        },
        //TODO
        coordY: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: {
                Empty: {
                    msg: "Le coordonné de Y ne peut étre vide.",
                },
                notNull: { msg: "Le coordonné de Y est requise." },
                isInt: { msg: "Le coordonné de Y est incorrecte." },
            },
        },
    });
});
