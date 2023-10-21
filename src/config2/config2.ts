import 'dotenv/config';
// import dataToConfigInstance from '../configData'
import db from '../models';
import { QueryTypes } from 'sequelize';
const MyQuery = db.sequelize
export const configs = async () => {

  const dataToConfigss = await MyQuery.query(`select * from botdatas  `, { type: QueryTypes.SELECT })

  const dataToConfig2 = await MyQuery.query(`select decimals, name, address, symbol from tokendatas  `, { type: QueryTypes.SELECT })
  const dataToConfig3 = await MyQuery.query(`select WHITELISTED_USERS from whitelists  `, { type: QueryTypes.SELECT })
  var transformedDataToConfig2 = dataToConfig2
  if (dataToConfig3.length > 0) {
    transformedDataToConfig2 = dataToConfig3.map((item: { WHITELISTED_USERS: any; }) => item.WHITELISTED_USERS);
  }
  const dataToConfigs = dataToConfigss[0]

  return {

    /**
    * @description PRIVATE_KEY is the private key of the account that will be used to sign transactions
    */
    PRIVATE_KEY: process.env.PRIVATE_KEY!,

    /**
     * @description JSON RPC endpoint
     * @type {string}
     */
    JSON_RPC: process.env.JSON_RPC!,

    /**
     * @description WSS_URL is the websocket endpoint of the WSS  endpoint
     */

    WSS_URL: process.env.WSS_URL!,

    /**
     * @description Contract address
     * @type {string}
     */

    /**
     * STABLE TOKENS addresses e.g BUSD, USDT, USDC, etc
     */
    STABLE_TOKENS: [''],

    /**
     * @description Explorer URL
     */
    EXPLORER_URL: 'https://bscscan.com',

    /**
     * @description Telegram Bot Token
     */

    BOT_TOKEN: process.env.BOT_TOKEN!,

    /**
     * @description Telegram Chat IDs for users to receive notifications
     * @type {string[]}
     */

    // get your account id from this bot https://t.me/getmyid_bot
    WHITELISTED_USERS: transformedDataToConfig2,
    // WHITELISTED_USERS: ,

    ////////////// FALLBACK VALUES /////////////////

    /**
     * @description DEFAULT_GAS_LIMIT that we use in transactions
     */
    DEFAULT_GAS_LIMIT: parseFloat(dataToConfigs.DEFAULT_GAS_LIMIT),

    /**
     * @description MIN_SLIPPAGE_THRESHOLD is the minimum slippage threshold that we allow
     * @type {number}
     * @default 1%
     */
    MIN_SLIPPAGE_THRESHOLD: dataToConfigs.MIN_SLIPPAGE_THRESHOLD,

    /**
     * @description GAS_FACTOR that we use in front-running the target
     */
    GAS_FACTOR: 3.9,

    //////////////// TRADE CONFIG /////////////////

    /**
     * @description WBNB address
     * @type {string}
     * @default 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
     */
    WBNB_ADDRESS: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
   

    /**
     * @description PancakeSwap Router address
     * @type {string}
     */
    // V3 BSC
    // PANCAKE_ROUTER_ADDRESS: '0x13f4EA83D0bd40E75C8222255bc855a974568Dd4',
    // V2 BSC
    PANCAKE_ROUTER_ADDRESS: dataToConfigs.PANCAKE_ROUTER_ADDRESS,


    /**
     * @description Trade Config
     * @type MIN_PROFIT_THRESHOLD is the minimum profit threshold that we allow
     * @type {number}
     */
    MIN_PROFIT_THRESHOLD: parseFloat(dataToConfigs.MIN_PROFIT_THRESHOLD),

    /**
   * @description TOKEN_DATA
   * @type TOKEN_DATA 
   * @type {any}
   */
    TOKEN_DATA: dataToConfig2,
    /**
  * @description WBNB_DATA
  * @type WBNB_DATA 
  * @type {any}
  */
    WBNB_DATA: { symbol: "WBNB", decimals: 18, address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", name: "WrappedBNB" },
    /**
     * @description MIN_TARGET_AMOUNT
     * @type MIN_TARGET_AMOUNT 
     * @type {string}
    */
    MIN_TARGET_AMOUNT: dataToConfigs.MIN_TARGET_AMOUNT,
    /**
      * @description  MIN_TARGET_AMOUNT_DECIMAL
      * @type MIN_TARGET_AMOUNT_DECIMAL
      * @type {Number}
     */
    MIN_TARGET_AMOUNT_DECIMAL: 18
  };
};

// export default config;
