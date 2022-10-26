import { Sequelize } from "sequelize";

export default async (sequelize: Sequelize, dataTypes: any) => {
  sequelize.define("Info_piece", {
    //TODO
    id: {
      type: dataTypes.UUID,
      primaryKey: true,
      defaultValue: dataTypes.UUIDV4,
    },
    //TODO
    nom: {
      type: dataTypes.ENUM(
        "Chemise",
        "Combinaison",
        "Gilet",
        "Jeans",
        "Jupe",
        "Joggin",
        "Pull",
        "Tee-shirt",
        "Veste",
        "Robe",
        "Manteau",
        "Blouse"
      ),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le nom de la piéce ne peut étre vide." },
        notNull: { msg: "Le nom de la piéce est requise." },
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
      validate: {
        notEmpty: {
          msg: "Le prix de repassage ne peut étre vide.",
        },
        notNull: { msg: "Le prix de repassage est requise." },
        isInt: { msg: "Le prix de repassage est incorrecte." },
      },
    },
  });
};
