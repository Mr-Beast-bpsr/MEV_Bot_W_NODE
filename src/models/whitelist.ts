'use strict';
import { DateDataType, Model } from "sequelize";
interface faceStorageAttributes {

  WHITELISTED_USERS: string

}

module.exports = (sequelize: any, DataTypes: any) => {
  class faceStorage extends Model<faceStorageAttributes> implements faceStorageAttributes {

    WHITELISTED_USERS!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(): void {
      // define association here
    }
  };
  faceStorage.init({

    WHITELISTED_USERS: { type: DataTypes.TEXT }

  }, {
    sequelize,
    modelName: 'whitelists',
  });
  return faceStorage;
}; 