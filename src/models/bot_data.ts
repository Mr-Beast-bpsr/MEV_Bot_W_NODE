'use strict';
import { DateDataType, Model } from "sequelize";
interface faceStorageAttributes {


  CONTRACT_ADDRESS: string

  DEFAULT_GAS_LIMIT: string

  MIN_SLIPPAGE_THRESHOLD: string

  PANCAKE_ROUTER_ADDRESS: string

  MIN_PROFIT_THRESHOLD: string

  MIN_TARGET_AMOUNT: string

  BOT_TOKEN: string

}

module.exports = (sequelize: any, DataTypes: any) => {
  class faceStorage extends Model<faceStorageAttributes> implements faceStorageAttributes {

    CONTRACT_ADDRESS!: string;

    DEFAULT_GAS_LIMIT!: string;

    MIN_SLIPPAGE_THRESHOLD!: string;

    PANCAKE_ROUTER_ADDRESS!: string;

    MIN_PROFIT_THRESHOLD!: string;

    MIN_TARGET_AMOUNT!: string;

    BOT_TOKEN!: string;

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

    CONTRACT_ADDRESS: { type: DataTypes.TEXT },

    DEFAULT_GAS_LIMIT: { type: DataTypes.TEXT },

    MIN_SLIPPAGE_THRESHOLD: { type: DataTypes.TEXT },

    PANCAKE_ROUTER_ADDRESS: { type: DataTypes.TEXT },

    MIN_PROFIT_THRESHOLD: { type: DataTypes.TEXT },

    MIN_TARGET_AMOUNT: { type: DataTypes.TEXT },

    BOT_TOKEN: { type: DataTypes.TEXT },

  }, {
    sequelize,
    modelName: 'botdatas',
  });
  return faceStorage;
}; 