"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, dataTypes) => {
    sequelize.define("Demande_depense", {
        //TODO
        id: {
            type: dataTypes.UUID,
            primaryKey: true,
            defaultValue: dataTypes.UUIDV4,
        },
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
                len: {
                    args: [2, 500],
                    msg: "La description de la demande de dépense doit etre comprise entre 2 à 500 lettres.",
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
