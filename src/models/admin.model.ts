import { Sequelize } from "sequelize";

export default (sequelize: Sequelize, dataTypes: any) => {
  sequelize.define("Admin", {
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
        notEmpty: { msg: "Le nom de l'administrateur ne peut étre vide." },
        notNull: { msg: "Le nom de l'administrateur est requise." },
        len: {
          args: [2, 15],
          msg: "Le nom de l'administrateur doit étre comprise entre 2 à 15 lettres.",
        },
      },
    },
    //TODO
    prenom: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le prenom de l'administrateur ne peut étre vide." },
        notNull: { msg: "Le prenom de l'administrateur est requise." },
        len: {
          args: [2, 25],
          msg: "Le prenom de l'administrateur doit étre comprise entre 2 à 25 lettres.",
        },
      },
    },
    //TODO
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: { name: "email", msg: "Désoler cet e-mail existe déja." },
      validate: {
        notEmpty: { msg: "L'e-mail de l'administrateur ne peut étre vide." },
        notNull: { msg: "L'e-mail de l'administrateur est requise." },
        isEmail: {
          msg: "Le format d'e-mail de l'administrateur est incorrect.",
        },
      },
    },
    //TODO
    mdp: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Le mot de passe de l'administrateur ne peut étre vide.",
        },
        notNull: { msg: "Le mot de passe de l'administrateur est requise." },
      },
    },
    //TODO
    role: {
      type: dataTypes.ENUM("admin", "employer"),
      allowNull: false,
      defaultValue: "admin",
    },
  });
};
