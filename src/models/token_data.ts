'use strict';
import { DateDataType, Model } from "sequelize";
interface faceStorageAttributes {


  decimals: string

  name: string

  address: string

  symbol: string

}

module.exports = (sequelize: any, DataTypes: any) => {
  class faceStorage extends Model<faceStorageAttributes> implements faceStorageAttributes {

    decimals!: string;

    name!: string;
  
    address!: string;
  
    symbol!: string;

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

    decimals: { type: DataTypes.TEXT },

    name: { type: DataTypes.TEXT },

    address: { type: DataTypes.TEXT },

    symbol: { type: DataTypes.TEXT },

  }, {
    sequelize,
    modelName: 'tokendatas',
  });
  return faceStorage;
}; 