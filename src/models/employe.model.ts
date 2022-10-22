import { Sequelize } from "sequelize";

export default async (sequelize: Sequelize, dataTypes: any) => {
  sequelize.define("Employe", {
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
        notEmpty: { msg: "Le nom de l'employé ne peut étre vide." },
        notNull: { msg: "Le nom de l'employé est requise." },
        min: { args: [2], msg: "Le nom de l'employé est trop court." },
        max: { args: [15], msg: "Le nom de l'employé est trop long." },
      },
    },
    //TODO
    prenom: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le prenom de l'employé ne peut étre vide." },
        notNull: { msg: "Le prenom de l'employé est requise." },
        min: {
          args: [2],
          msg: "Le prenom de l'employé est trop court.",
        },
        max: {
          args: [25],
          msg: "Le prenom de l'employé est trop long.",
        },
      },
    },
    //TODO
    numero: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le numéro de l'employé ne peut étre vide." },
        notNull: { msg: "Le numéro de l'employé est requise." },
        len: { args: [9, 9], msg: "Le numéro de l'employé est incorrect." },
      },
    },
    //TODO
    adresse: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "L'adresse de l'employé ne peut étre vide." },
        notNull: { msg: "L'adresse de l'employé est requise." },
        min: {
          args: [2],
          msg: "L'adresse de l'employé est trop court.",
        },
        max: {
          args: [25],
          msg: "L'adresse de l'employé est trop long.",
        },
      },
    },
    //TODO
    salaire: {
      type: dataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le salaire de l'employé ne peut étre vide." },
        notNull: { msg: "Le salaire de l'employé est requise." },
        isInt: { msg: "Le format de salaire est incorrecte." },
      },
    },
    //TODO
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "L'e-mail de l'employé ne peut étre vide." },
        notNull: { msg: "L'e-mail de l'employé est requise." },
        isEmail: {
          msg: "Le format d'e-mail de l'employé est incorrect.",
        },
      },
    },
    //TODO
    mdp: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le mot de passe de l'employé ne peut étre vide." },
        notNull: { msg: "Le mot de passe de l'employé est requise." },
      },
    },
  });
};
