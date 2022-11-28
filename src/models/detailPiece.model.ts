import { Sequelize } from "sequelize";

export default async (sequelize: Sequelize, dataTypes: any) => {
  sequelize.define("Detail_type_piece", {
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
        notEmpty: { msg: "Le nom du piece ne peut étre vide." },
        notNull: { msg: "Le nom du piece est requise." },
        len: {
          args: [2, 35],
          msg: "Le nom du piece doit étre comprise entre 2 à 35 lettres.",
        },
      },
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
