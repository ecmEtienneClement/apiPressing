import { Sequelize } from "sequelize";

export default async (sequelize: Sequelize, dataTypes: any) => {
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
};
