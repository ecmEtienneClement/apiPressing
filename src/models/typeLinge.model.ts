import { Sequelize } from "sequelize";

export default async (sequelize: Sequelize, dataTypes: any) => {
  sequelize.define("Type_linge", {
    //TODO
    id: {
      type: dataTypes.UUID,
      primaryKey: true,
      defaultValue: dataTypes.UUIDV4,
    },
    //TODO
    nom: {
      type: dataTypes.ENUM("Piece", "Kilo"),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le type de linge ne peut étre vide." },
        notNull: { msg: "Le type de linge est requise." },
      },
    },
  });
};
