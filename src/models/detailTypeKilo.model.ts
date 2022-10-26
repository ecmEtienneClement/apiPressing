import { Sequelize } from "sequelize";

export default async (sequelize: Sequelize, dataTypes: any) => {
  sequelize.define("Detail_type_kilo", {
    //TODO
    id: {
      type: dataTypes.UUID,
      primaryKey: true,
      defaultValue: dataTypes.UUIDV4,
    },
    //TODO
    nbrKilo: {
      type: dataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Le nombre de kilo ne peut étre vide.",
        },
        notNull: { msg: "Le nombre de kilo est requise." },
        isInt: { msg: "Le nombre de kilo est incorrecte." },
        min: { args: [1], msg: "Le nombre de kilo minimal est de 1kg." },
        max: {
          args: [100],
          msg: "Le nombre de kilo est trés volumineux pour le linge.",
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
};
