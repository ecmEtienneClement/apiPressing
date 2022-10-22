import { DataTypes, Sequelize } from "sequelize";
import adminModel from "./admin.model";
import clientModel from "./client.model";
import compteBloqueModel from "./compteBloque.model";
import demandeDepenseModel from "./demandeDepense.model";
import depenseModel from "./depense.model";
import detailPieceModel from "./detailPiece.model";
import detailTypeKiloModel from "./detailTypeKilo.model";
import detailTypePieceModel from "./detailTypePiece.model";
import employeModel from "./employe.model";
import etatFinancierModel from "./etatFinancier.model";
import factureModel from "./facture.model";
import infoKiloModel from "./infoKilo.model";
import infoPieceModel from "./infoPiece.model";
import lingeModel from "./linge.model";
import typeLingeModel from "./typeLinge.model";

//
export default async (sequelize: Sequelize) => {
  const dataAllPromise = await Promise.all([
    adminModel(sequelize, DataTypes),
    clientModel(sequelize, DataTypes),
    compteBloqueModel(sequelize, DataTypes),
    demandeDepenseModel(sequelize, DataTypes),
    depenseModel(sequelize, DataTypes),
    detailPieceModel(sequelize, DataTypes),
    detailTypeKiloModel(sequelize, DataTypes),
    detailTypePieceModel(sequelize, DataTypes),
    employeModel(sequelize, DataTypes),
    etatFinancierModel(sequelize, DataTypes),
    factureModel(sequelize, DataTypes),
    infoKiloModel(sequelize, DataTypes),
    infoPieceModel(sequelize, DataTypes),
    lingeModel(sequelize, DataTypes),
    typeLingeModel(sequelize, DataTypes),
  ]);
  if (dataAllPromise) {
    return setRelationsModels(sequelize);
  } else {
    return false;
  }
};

//
async function setRelationsModels(sequelize: Sequelize): Promise<boolean> {
  //MODELS
  const adminModel = sequelize.models.Admin;
  const employerModel = sequelize.models.Employe;
  const factureModel = sequelize.models.Facture;
  const compteBloquerModel = sequelize.models.Compte_bloquer;
  const demandeDepenseModel = sequelize.models.Demande_depense;
  const depenseModel = sequelize.models.Depense;
  const clientModel = sequelize.models.Client;
  const lingeModel = sequelize.models.Linge;
  const typeLingeModel = sequelize.models.Type_linge;
  const detailTypeKiloModel = sequelize.models.Detail_type_kilo;
  const detailTypePieceModel = sequelize.models.Detail_type_piece;
  const detailPieceModel = sequelize.models.Detail_piece;
  try {
    //TODO RELATION ADMIN
    //ADMIN  <== FACTURE
    adminModel.hasMany(factureModel, {
      foreignKey: { allowNull: false },
    });
    factureModel.belongsTo(adminModel);
    //ADMIN  <== COMPTE_BLOQUER
    adminModel.hasMany(compteBloquerModel, {
      foreignKey: { allowNull: false },
    });
    compteBloquerModel.belongsTo(adminModel);
    //ADMIN  <== DEMANDE_DEPENSE
    adminModel.hasMany(demandeDepenseModel, {
      foreignKey: { allowNull: false },
    });
    demandeDepenseModel.belongsTo(adminModel);

    //TODO RELATION EMPLOYER
    //EMPLOYER  <== DEMANDE_DEPENSE
    employerModel.hasMany(demandeDepenseModel, {
      foreignKey: { allowNull: false },
    });
    demandeDepenseModel.belongsTo(employerModel);
    //EMPLOYER  <== LINGE
    employerModel.hasMany(lingeModel, {
      foreignKey: { allowNull: false },
    });
    lingeModel.belongsTo(employerModel);
    //EMPLOYER  <== CLIENT
    employerModel.hasMany(clientModel, {
      foreignKey: { allowNull: false },
    });
    clientModel.belongsTo(employerModel);
    //EMPLOYER  <== COMPTE_BLOQUER
    employerModel.hasOne(compteBloquerModel, {
      foreignKey: { allowNull: false },
    });
    compteBloquerModel.belongsTo(employerModel);

    //TODO RELATION DEMANDE_DEPENSE
    //DEMANDE_DEPENSE  <== DEPENSE
    demandeDepenseModel.hasOne(depenseModel, {
      foreignKey: { allowNull: false },
    });
    depenseModel.belongsTo(demandeDepenseModel);

    //TODO RELATION CLIENT
    //CLIENT  <== LINGE
    clientModel.hasMany(lingeModel, {
      foreignKey: { allowNull: false },
    });
    lingeModel.belongsTo(clientModel);

    //TODO RELATION TYPE LINGE
    //TYPE LINGE  <== LINGE
    typeLingeModel.hasMany(lingeModel, {
      foreignKey: { allowNull: false },
    });
    lingeModel.belongsTo(typeLingeModel);

    //TODO RELATION DETAIL_TYPE_KILO
    //DETAIL_TYPE_KILO  <== LINGE
    detailTypeKiloModel.hasOne(lingeModel, {
      foreignKey: { allowNull: true },
    });
    lingeModel.belongsTo(detailTypeKiloModel);

    //TODO RELATION DETAIL_TYPE_PIECE
    //DETAIL_TYPE_PIECE  <== LINGE
    detailTypePieceModel.hasOne(lingeModel, {
      foreignKey: { allowNull: true },
    });
    lingeModel.belongsTo(detailTypePieceModel);

    //TODO RELATION DETAIL_PIECE
    //DETAIL_PIECE  <== DETAIL_TYPE_PIECE
    detailTypePieceModel.hasMany(detailPieceModel, {
      foreignKey: { allowNull: false },
    });
    detailPieceModel.belongsTo(detailTypePieceModel);
    return true;
  } catch (error) {
    console.log(
      "Une erreur c'est produite l'or de la mise en place des relations : \n" +
        error
    );
    return false;
  }
}
