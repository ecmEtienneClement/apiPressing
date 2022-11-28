import { Sequelize } from "sequelize";

export default (sequelize: Sequelize, dataTypes: any) => {
  sequelize.define("Etat_financier", {
    //TODO
    id: {
      type: dataTypes.UUID,
      primaryKey: true,
      defaultValue: dataTypes.UUIDV4,
    },
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
  });
};
