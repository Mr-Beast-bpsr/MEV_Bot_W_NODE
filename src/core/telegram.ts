import { Context, Markup, Telegraf } from 'telegraf';
import { configs } from '../config2';

import { normalizeMessage } from '../helpers/telegram';

async function someFunction() {
  try {
    const config = await configs();

    // Now you can access the configuration properties like this:
    return {
      PANCAKE_ROUTER_ADDRESS: config.PANCAKE_ROUTER_ADDRESS,
      PRIVATE_KEY: config.PRIVATE_KEY,
      WBNB_ADDRESS: config.WBNB_ADDRESS,
      JSON_RPC: config.JSON_RPC,
      WHITELISTED_USERS: config.WHITELISTED_USERS
    }


    // ... and so on
  } catch (error) {
    console.error('Error:', error);
  }
}


//create an instance of telegraf
const BOT_TOKEN: any = process.env.BOT_TOKEN
const bot = new Telegraf(BOT_TOKEN);

bot.use(async (ctx: Context, next: any) => {
  try {
    const config:any = await someFunction()
    let userId = ctx.message?.from.id || '';
    if (config.WHITELISTED_USERS.includes(userId.toString())) {
      await next();
      return;
    } else {
      return ctx.reply('You are not allowed to use this bot');
    }
  } catch (error) {
    console.log(error);
  }
});

/**
 *
 * @param message the message to be sent to telegrams
 */
const sendMessage = async (message: string) => {
  const config:any = await someFunction()
  for (const id of config.WHITELISTED_USERS) {
    try {

      await bot.telegram.sendMessage(id, normalizeMessage(message), {
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true,
      });
    } catch (error) {
      console.error(error);
    }
  }
};

export { bot, sendMessage };
