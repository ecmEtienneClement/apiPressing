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
    sequelize.define("Client", {
        //TODO
        id: {
            type: dataTypes.UUID,
            primaryKey: true,
            defaultValue: dataTypes.UUIDV4,
        },
        //TODO
        nom: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le nom du client ne peut étre vide." },
                notNull: { msg: "Le nom du client est requise." },
                len: {
                    args: [2, 15],
                    msg: "Le nom du client doit étre comprise entre 2 à 15 lettres.",
                },
            },
        },
        //TODO
        prenom: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le prenom du client ne peut étre vide." },
                notNull: { msg: "Le prenom du client est requise." },
                len: {
                    args: [2, 25],
                    msg: "Le prenom du client doit étre comprise entre 2 à 25 lettres.",
                },
            },
        },
        //TODO
        numero: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: { name: "numero", msg: "Désoler cet numéro existe déja." },
            validate: {
                notEmpty: { msg: "Le numéro du client ne peut étre vide." },
                notNull: { msg: "Le numéro du client est requise." },
                len: { args: [9, 9], msg: "Le numéro du client est incorrect." },
            },
        },
        //TODO
        adresse: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "L'adresse du client ne peut étre vide." },
                notNull: { msg: "L'adresse du client est requise." },
                len: {
                    args: [2, 35],
                    msg: "L'adresse du client doit étre comprise entre 2 à 35 lettres.",
                },
            },
        },
        //TODO
        nbrLinge: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: "Le format du nombre de linge est incorrecte." },
            },
            defaultValue: 1,
        },
        //TODO
        codeFidelite: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: "Le format du code fidélité de linge est incorrecte." },
            },
            defaultValue: 0,
        },
    });
});
