import { Sequelize } from "sequelize";

export default (sequelize: Sequelize, dataTypes: any) => {
  sequelize.define("Admin", {
    //TODO
    id: { type: dataTypes.UUID, primaryKey: true },
    //TODO
    nom: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le nom de l'administrateur ne peut étre vide." },
        notNull: { msg: "Le nom de l'administrateur est requise." },
        min: { args: [2], msg: "Le nom de l'administrateur est trop court." },
        max: { args: [15], msg: "Le nom de l'administrateur est trop long." },
      },
    },
    //TODO
    prenom: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le prenom de l'administrateur ne peut étre vide." },
        notNull: { msg: "Le prenom de l'administrateur est requise." },
        min: {
          args: [2],
          msg: "Le prenom de l'administrateur est trop court.",
        },
        max: {
          args: [25],
          msg: "Le prenom de l'administrateur est trop long.",
        },
      },
    },
    //TODO
    email: {
      type: dataTypes.STRING,
      allowNull: false,
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
  });
};
