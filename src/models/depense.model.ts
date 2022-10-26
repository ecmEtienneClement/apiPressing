import { Sequelize } from "sequelize";

export default (sequelize: Sequelize, dataTypes: any) => {
  sequelize.define("Depense", {
    //TODO
    id: {
      type: dataTypes.UUID,
      primaryKey: true,
      defaultValue: dataTypes.UUIDV4,
    },
  });
};
