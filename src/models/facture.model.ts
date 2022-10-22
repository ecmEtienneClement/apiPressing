import { Sequelize } from "sequelize";

export default (sequelize: Sequelize, dataTypes: any) => {
  sequelize.define("Facture", {
    //TODO
    id: { type: dataTypes.UUID, primaryKey: true },
    //TODO
    type: {
      type: dataTypes.ENUM("Electricité", "Eaux", "Salaires", "Location"),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le type de facture ne peut étre vide." },
        notNull: { msg: "Le type de facture est requise." },
      },
    },
    //TODO
    montant: {
      type: dataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Le montant de la facture ne peut étre vide.",
        },
        notNull: { msg: "Le montant de la facture est requise." },
        isInt: { msg: "Le montant de la facture est incorrecte." },
      },
    },
  });
};
