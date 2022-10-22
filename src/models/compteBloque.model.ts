import { Sequelize } from "sequelize";

export default (sequelize: Sequelize, dataTypes: any) => {
  sequelize.define("Compte_bloquer", {
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
    byAdmin: {
      type: dataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
