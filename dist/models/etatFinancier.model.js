"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, dataTypes) => {
    sequelize.define("Etat_financier", {
        //TODO
        id: { type: dataTypes.UUID, primaryKey: true },
        //TODO
        caisse: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Le montant de la caisse ne peut étre vide.",
                },
                notNull: { msg: "Le montant de la caisse est requise." },
                isInt: { msg: "Le montant de la caisse est incorrecte." },
            },
        },
        //TODO
        depense: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Le montant de la depense ne peut étre vide.",
                },
                notNull: { msg: "Le montant de la depense est requise." },
                isInt: { msg: "Le montant de la depense est incorrecte." },
            },
        },
        //TODO
        dataUpdateCaisse: {
            type: dataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "La date de mise à jour de la caisse ne peut étre vide.",
                },
                notNull: { msg: "La date de mise à jour de la caisse est requise." },
            },
        },
        //TODO
        dataUpdateDepense: {
            type: dataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "La date de mise à jour de la dépense ne peut étre vide.",
                },
                notNull: { msg: "La date de mise à jour de la dépense est requise." },
            },
        },
    });
};
