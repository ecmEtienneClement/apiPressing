import { Sequelize } from "sequelize";

export default async (sequelize: Sequelize, dataTypes: any) => {
  sequelize.define("Detail_type_piece", {
    //TODO
    id: {
      type: dataTypes.UUID,
      primaryKey: true,
    },
  });
};
