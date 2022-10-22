"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, dataTypes) => {
    sequelize.define("Demande_depense", {
        //TODO
        id: { type: dataTypes.UUID, primaryKey: true },
        //TODO
        description: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "La description de la demande de dépense ne peut étre vide.",
                },
                notNull: {
                    msg: "La description de la demande de dépense est requise.",
                },
                min: {
                    args: [10],
                    msg: "La description de la demande de dépense est trop courte",
                },
                max: {
                    args: [500],
                    msg: "La description de la demande de dépense est trop longue",
                },
            },
        },
        //TODO
        montant: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Le montant de la demande de dépense ne peut étre vide.",
                },
                notNull: { msg: "Le montant de la demande de dépense est requise." },
                isInt: { msg: "Le montant de la demande de dépense est incorrecte." },
            },
        },
        //TODO
        valider: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        //TODO
        rejeter: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    });
};
