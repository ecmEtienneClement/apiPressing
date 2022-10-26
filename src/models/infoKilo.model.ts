import { Sequelize } from "sequelize";

export default async (sequelize: Sequelize, dataTypes: any) => {
  sequelize.define("Info_kilo", {
    //TODO
    id: {
      type: dataTypes.UUID,
      primaryKey: true,
      defaultValue: dataTypes.UUIDV4,
    },

    //TODO
    prixLinge: {
      type: dataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Le prix de linge/kilo ne peut étre vide.",
        },
        notNull: { msg: "Le prix de linge/kilo est requise." },
        isInt: { msg: "Le prix de linge/kilo est incorrecte." },
      },
    },
    //TODO
    prixRepassage: {
      type: dataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Le prix de repassage/kilo ne peut étre vide.",
        },
        notNull: { msg: "Le prix de repassage/kilo est requise." },
        isInt: { msg: "Le prix de repassage/kilo est incorrecte." },
      },
    },
  });
};
