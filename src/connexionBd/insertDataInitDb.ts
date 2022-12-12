import { Op } from "sequelize";
import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
export class InsertDataInitDb {
  //TODO
  public static async initialiseurDefaultData(
    sequelize: Sequelize
  ): Promise<void> {
    await Promise.all([
      InsertDataInitDb.iniDefaultAdmin(sequelize),
      InsertDataInitDb.iniDefaultEtatFinancier(sequelize),
      InsertDataInitDb.iniDefaultTypeLinge(sequelize),
      InsertDataInitDb.iniDefaultInfoKilo(sequelize),
      InsertDataInitDb.iniDefaultInfoPiece(sequelize),
    ]);
  }

  //TODO
  private static async iniDefaultAdmin(sequelize: Sequelize): Promise<void> {
    const modelDefaultAdmin = sequelize.models.Admin;
    const dataDefautlAdmin = await modelDefaultAdmin.findOne({
      where: {
        email: "ecmbayeclement@gmail.com",
      },
    });
    if (!dataDefautlAdmin) {
      try {
        //HASH
        const salt = await bcrypt.genSalt(10);
        const pwdHash = await bcrypt.hash("Firstadmin01", salt);
        await modelDefaultAdmin.create({
          nom: "MBAYE",
          prenom: "Etienne Clement",
          email: "ecmbayeclement@gmail.com",
          numero: "777777777",
          mdp: pwdHash,
        });
      } catch (error) {
        throw new Error(
          "Une erreut c'est produite avec les default type de linge " + error
        );
      }
    }
  }

  //TODO
  private static async iniDefaultEtatFinancier(
    sequelize: Sequelize
  ): Promise<void> {
    const modelDefaultEtatFinancier = sequelize.models.Etat_financier;
    const dataDefautlEtatFinancier = await modelDefaultEtatFinancier.findAll({
      limit: 1,
    });
    if (dataDefautlEtatFinancier.length < 1) {
      try {
        await modelDefaultEtatFinancier.create({
          caisse: 0,
          depense: 0,
        });
      } catch (error) {
        throw new Error(
          "Une erreut c'est produite avec le default etat financier " + error
        );
      }
    }
  }
  //TODO
  private static async iniDefaultTypeLinge(
    sequelize: Sequelize
  ): Promise<void> {
    const modelDefaultTypeLinge = sequelize.models.Type_linge;
    const dataDefautlTypeLinge = await modelDefaultTypeLinge.findOne({
      where: { [Op.or]: [{ nom: "Kilo" }, { nom: "Piece" }] },
    });
    if (!dataDefautlTypeLinge) {
      try {
        Promise.all([
          await modelDefaultTypeLinge.create({
            nom: "kilo",
          }),
          await modelDefaultTypeLinge.create({
            nom: "Piece",
          }),
        ]);
      } catch (error) {
        throw new Error(
          "Une erreut c'est produite avec les default type de linge " + error
        );
      }
    }
  }

  //TODO
  private static async iniDefaultInfoKilo(sequelize: Sequelize): Promise<void> {
    const modelDefaultInfoKilo = sequelize.models.Info_kilo;
    const dataDefautlInfoKilo = await modelDefaultInfoKilo.findAll({
      limit: 1,
    });
    if (dataDefautlInfoKilo.length < 1) {
      try {
        await modelDefaultInfoKilo.create({
          prixLinge: 400,
          prixRepassage: 125,
        });
      } catch (error) {
        throw new Error(
          "Une erreut c'est produite avec le default info kilo " + error
        );
      }
    }
  }

  //TODO
  private static async iniDefaultInfoPiece(
    sequelize: Sequelize
  ): Promise<void> {
    const modelDefaultInfoPiece = sequelize.models.Info_piece;
    const dataDefautlInfoPiece = await modelDefaultInfoPiece.findAll({
      limit: 1,
    });
    if (dataDefautlInfoPiece.length < 1) {
      try {
        Promise.all([
          await modelDefaultInfoPiece.create({
            nom: "Chemise",
            prixLinge: 200,
            prixRepassage: 100,
          }),
          await modelDefaultInfoPiece.create({
            nom: "Combinaison",
            prixLinge: 350,
            prixRepassage: 150,
          }),
          await modelDefaultInfoPiece.create({
            nom: "Gilet",
            prixLinge: 100,
            prixRepassage: 100,
          }),
          await modelDefaultInfoPiece.create({
            nom: "Jeans",
            prixLinge: 250,
            prixRepassage: 100,
          }),
          await modelDefaultInfoPiece.create({
            nom: "Jupe",
            prixLinge: 250,
            prixRepassage: 100,
          }),
          await modelDefaultInfoPiece.create({
            nom: "Joggin",
            prixLinge: 300,
            prixRepassage: 150,
          }),
          await modelDefaultInfoPiece.create({
            nom: "Pull",
            prixLinge: 250,
            prixRepassage: 150,
          }),
          await modelDefaultInfoPiece.create({
            nom: "Tee-shirt",
            prixLinge: 100,
            prixRepassage: 100,
          }),
          await modelDefaultInfoPiece.create({
            nom: "Veste",
            prixLinge: 400,
            prixRepassage: 200,
          }),
          await modelDefaultInfoPiece.create({
            nom: "Manteau",
            prixLinge: 350,
            prixRepassage: 150,
          }),
          await modelDefaultInfoPiece.create({
            nom: "Robe",
            prixLinge: 450,
            prixRepassage: 200,
          }),
          await modelDefaultInfoPiece.create({
            nom: "Blouse",
            prixLinge: 150,
            prixRepassage: 100,
          }),
        ]);
      } catch (error) {
        throw new Error(
          "Une erreut c'est produite avec le default info piece " + error
        );
      }
    }
  }
}
