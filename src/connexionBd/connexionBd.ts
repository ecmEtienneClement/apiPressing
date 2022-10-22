import dotenv from "dotenv";
import { env } from "process";
import { Sequelize } from "sequelize";
import initModels from "../models/initModels";
dotenv.config();

export default class ConnexionBd {
  private static sequelizeDb: Sequelize;

  //TODO
  public static getSequelizeDb(): Sequelize {
    return this.sequelizeDb;
  }
  //TODO
  private static setSequelizeDb(sequelize: Sequelize) {
    this.sequelizeDb = sequelize;
  }

  //TODO
  public static async connexionBdDev() {
    const sequelize: Sequelize = new Sequelize(env.bdName, env.user, env.pwd, {
      host: env.host,
      dialect: "mysql",
    });

    try {
      await sequelize.authenticate();
      console.log("[mode dev] Connexion à la BD réussit.");
      //Init Models
      const dataBoolean = await initModels(sequelize);
      if (dataBoolean) {
        sequelize
          .sync({ force: true })
          .then((dataSequelize) => {
            this.setSequelizeDb(dataSequelize);
            console.log("[mode dev] Le BD a été bien instancié.");
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
}
