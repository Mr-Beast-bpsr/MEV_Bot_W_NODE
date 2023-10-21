import db from './models';
import { constants, providers, utils } from 'ethers';
import { configs } from './config2';
import { sandwicher } from './core';
import { withdrawToken } from './helpers';

class DataToConfig {
    
    async someFunction() {
        try {
            const config = await configs();

            // Now you can access the configuration properties like this:
            return {
                PANCAKE_ROUTER_ADDRESS: config.PANCAKE_ROUTER_ADDRESS,
                PRIVATE_KEY: config.PRIVATE_KEY,
                WBNB_ADDRESS: config.WBNB_ADDRESS,
                JSON_RPC: config.JSON_RPC
            }


            // ... and so on
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async Main() {
        const config: any = await this.someFunction()
        console.info(`Starting...\n- - -`);
        // get args
        let args = process.argv.slice(2);

        args.length === 0 && sandwicher.init();

        if (args.length > 0) {
            let action = args[0].toLowerCase();
            let token = args[1];

            if (action === 'sell') {
                let { sellData } = sandwicher.prepareBuyAndSellData({
                    router: config.PANCAKE_ROUTER_ADDRESS,
                    path: [token, config.WBNB_ADDRESS],
                    amountOutMin: constants.Zero,
                    sellAmountOutMin: constants.Zero,
                    amountIn: constants.Zero,
                });
                let sell = await sandwicher.sellTx(sellData);
                console.log(sell);
            }

            if (action === 'transfer') {
                let provider = new providers.JsonRpcProvider(config.JSON_RPC);
                let transfer = await withdrawToken(provider, token);
                console.log(transfer);
            }

            if (action === 'buy') {
                let { buyData } = sandwicher.prepareBuyAndSellData({
                    router: config.PANCAKE_ROUTER_ADDRESS,
                    path: [config.WBNB_ADDRESS, token],
                    amountOutMin: constants.Zero,
                    sellAmountOutMin: constants.Zero,
                    amountIn: constants.Zero,
                });

                let buy = await sandwicher.buyTx(buyData);
                console.log(buy);
            }
        }
    };
}


const dataToConfigInstance = new DataToConfig();

export default dataToConfigInstance;
