import { Sequelize } from "sequelize";

export default async (sequelize: Sequelize, dataTypes: any) => {
  sequelize.define("Client", {
    //TODO
    id: {
      type: dataTypes.UUID,
      primaryKey: true,
    },
    //TODO
    nom: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le nom du client ne peut étre vide." },
        notNull: { msg: "Le nom du client est requise." },
        min: { args: [2], msg: "Le nom du client est trop court." },
        max: { args: [15], msg: "Le nom du client est trop long." },
      },
    },
    //TODO
    prenom: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le prenom du client ne peut étre vide." },
        notNull: { msg: "Le prenom du client est requise." },
        min: {
          args: [2],
          msg: "Le prenom du client est trop court.",
        },
        max: {
          args: [25],
          msg: "Le prenom du client est trop long.",
        },
      },
    },
    //TODO
    numero: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le numéro du client ne peut étre vide." },
        notNull: { msg: "Le numéro du client est requise." },
        len: { args: [9, 9], msg: "Le numéro du client est incorrect." },
      },
    },
    //TODO
    adresse: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "L'adresse du client ne peut étre vide." },
        notNull: { msg: "L'adresse du client est requise." },
        min: {
          args: [2],
          msg: "L'adresse du client est trop court.",
        },
        max: {
          args: [25],
          msg: "L'adresse du client est trop long.",
        },
      },
    },
    //TODO
    nbrLinge: {
      type: dataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Le format du nombre de linge est incorrecte." },
      },
      defaultValue: 1,
    },
    //TODO
    codeFidelite: {
      type: dataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Le format du code fidélité de linge est incorrecte." },
      },
      defaultValue: 0,
    },
  });
};
