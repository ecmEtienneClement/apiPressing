import { Sequelize } from "sequelize";

export default async (sequelize: Sequelize, dataTypes: any) => {
  sequelize.define("Employe", {
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
        notEmpty: { msg: "Le nom de l'employé ne peut étre vide." },
        notNull: { msg: "Le nom de l'employé est requise." },
        len: {
          args: [2, 15],
          msg: "Le nom de l'employé  doit étre comprise entre 2 à 15 lettres.",
        },
      },
    },
    //TODO
    prenom: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le prenom de l'employé ne peut étre vide." },
        notNull: { msg: "Le prenom de l'employé est requise." },
        len: {
          args: [2, 25],
          msg: "Le prenom de l'employé  doit étre comprise entre 2 à 25 lettres.",
        },
      },
    },
    //TODO
    numero: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: { name: "numero", msg: "Désoler cet numéro existe déja." },
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
        len: {
          args: [2, 25],
          msg: "L'adresse de l'employé  doit étre comprise entre 2 à 25 lettres.",
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
      unique: { name: "email", msg: "Désoler cet e-mail existe déja." },
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
    //TODO
    role: {
      type: dataTypes.ENUM("admin", "employer"),
      allowNull: false,
      defaultValue: "employer",
    },
  });
};
