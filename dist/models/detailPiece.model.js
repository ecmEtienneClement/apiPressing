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
    sequelize.define("Detail_piece", {
        //TODO
        id: {
            type: dataTypes.UUID,
            primaryKey: true,
        },
        //TODO
        nbrPiece: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Le nombre de piéce ne peut étre vide.",
                },
                notNull: { msg: "Le nombre de piéce est requise." },
                isInt: { msg: "Le nombre de piéce est incorrecte." },
                min: { args: [1], msg: "Le nombre de piéce minimal est de 1kg." },
                max: {
                    args: [500],
                    msg: "Le nombre de piéce est trés volumineux pour le linge.",
                },
            },
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
        prixRepassage: {
            type: dataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        //TODO
        aRepasser: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    });
});
