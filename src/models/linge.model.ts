import { Sequelize } from "sequelize";

export default async (sequelize: Sequelize, dataTypes: any) => {
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
};
