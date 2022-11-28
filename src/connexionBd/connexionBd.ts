import dotenv from "dotenv";
import { env } from "process";
import { Sequelize } from "sequelize";
import initModels from "../models/initModels";
import { NameModelsListe } from "../models/namingModelListe";
import { InsertDataInitDb } from "./insertDataInitDb";
dotenv.config();

export default class ConnexionBd {
  public static modelsList: Map<string, any> = new Map<string, any>();

  //TODO
  public static async connexionBdDev() {
    const sequelize: Sequelize = new Sequelize(
      env.BD_NAME,
      env.BD_USER,
      env.BD_PWD,
      {
        host: env.HOST,
        dialect: "mysql",
      }
    );

    try {
      await sequelize.authenticate();
      console.log("[mode dev] Connexion à la BD réussit.");
      //Init Models
      const dataBoolean = await initModels(sequelize);
      if (dataBoolean) {
        sequelize
          .sync({ force: false })
          .then((dataSequelize) => {
            InsertDataInitDb.initialiseurDefaultData(dataSequelize)
              .then(() => {
                this.initModelsList(dataSequelize);
                console.log("[mode dev] La BD a été bien instanciée.");
              })
              .catch((error) => {
                console.log("[mode dev] erreur init " + error);
              });
          })
          .catch((error) => {
            console.log(
              "[mode dev] Une erreur c'est produite l'or de la synchronisation de la BD : " +
                error
            );
          });
      }
    } catch (error) {
      console.log(
        "[mode dev] Une erreu s'est produite l'or de la connexion à la BD :\n" +
          error
      );
    }
  }

  //TODO INIT MODELS_LIST
  private static initModelsList = (sequelize: Sequelize): void => {
    const employers = sequelize.models.Employe;
    const admins = sequelize.models.Admin;
    const factures = sequelize.models.Facture;
    const depense = sequelize.models.Depense;
    const demandeDepenses = sequelize.models.Demande_depense;
    const compteBloquers = sequelize.models.Compte_bloquer;
    const clients = sequelize.models.Client;
    const linges = sequelize.models.Linge;
    const typeLinge = sequelize.models.Type_linge;
    const infoKilo = sequelize.models.Info_kilo;
    const infoPiece = sequelize.models.Info_piece;
    const detailTypeKilo = sequelize.models.Detail_type_kilo;
    const detailTypePiece = sequelize.models.Detail_type_piece;
    //
    this.modelsList.set(NameModelsListe.admin, admins);
    this.modelsList.set(NameModelsListe.facture, factures);
    this.modelsList.set(NameModelsListe.employer, employers);
    this.modelsList.set(NameModelsListe.dmdDepense, demandeDepenses);
    this.modelsList.set(NameModelsListe.depense, depense);
    this.modelsList.set(NameModelsListe.cmpBloquer, compteBloquers);
    this.modelsList.set(NameModelsListe.client, clients);
    this.modelsList.set(NameModelsListe.linge, linges);
    this.modelsList.set(NameModelsListe.infoKilo, infoKilo);
    this.modelsList.set(NameModelsListe.infoPiece, infoPiece);
    this.modelsList.set(NameModelsListe.typeLinge, typeLinge);
    this.modelsList.set(NameModelsListe.detailTypeKilo, detailTypeKilo);
    this.modelsList.set(NameModelsListe.detailTypePiece, detailTypePiece);
  };
}
