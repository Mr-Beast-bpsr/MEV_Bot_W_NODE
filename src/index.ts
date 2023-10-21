import express, { Request, Response, NextFunction } from 'express';
// import { constants, providers, utils } from 'ethers';
// import { config } from './config';
// import { sandwicher } from './core';
// import { withdrawToken } from './helpers';
// import { configs } from './config2'; 

import db from './models';
import dataToConfigInstance from './configData'


const app = express();
var cors: any = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

const server = require('http').createServer(app);
const port = process.env.PORT || 4001;
app.get("/", function (req, res) {
  res.send("Response from the GET request")
});

app.use(express.json());

app.get("/api/v1/welcome", (req, res) => {
  res.status(200).send("data get successfully ");
});

app.get("/api/v1/get_data", async (req, res) => {
  const data = await db.botdatas.findOne({
    where: {
      id: 1
    }
  })
  return res.status(200).json({
    data,
    message: "Successfully Fetched"
  })
});

app.get("/api/v1/get_whitelist", async (req, res) => {
  const data = await db.whitelists.findAll()
  return res.status(200).json({
    data,
    message: "Successfully Fetched"
  })
});

app.get("/api/v1/get_tokendatas", async (req, res) => {
  const data = await db.tokendatas.findAll()
  return res.status(200).json({
    data,
    message: "Successfully Fetched"
  })
});

app.post("/api/v1/update_data", async (req, res) => {
  try {
    const { CONTRACT_ADDRESS, DEFAULT_GAS_LIMIT, MIN_SLIPPAGE_THRESHOLD,
      PANCAKE_ROUTER_ADDRESS, MIN_PROFIT_THRESHOLD, MIN_TARGET_AMOUNT, BOT_TOKEN } = req.body;

    var data = await db.botdatas.findOne({
      where: {
        id: 1
      }
    })
    if (data) {
      await data.update({
        CONTRACT_ADDRESS, DEFAULT_GAS_LIMIT, MIN_SLIPPAGE_THRESHOLD,
        PANCAKE_ROUTER_ADDRESS, MIN_PROFIT_THRESHOLD, MIN_TARGET_AMOUNT, BOT_TOKEN
      })

    }
    return res.status(200).json({
      data,
      message: "Successfully updated"
    })

  } catch (e) {
    console.log(e)
    return res.status(400).json({
      message: `${e}`
    })
  }
});


app.post("/api/v1/add_whitelist", async (req, res) => {
  try {
    const { WHITELISTED_USERS } = req.body;
    console.log(WHITELISTED_USERS)
    var find = await db.whitelists.create({
      WHITELISTED_USERS
    })

    return res.status(200).json({
      find,
      message: "Successfully updated"
    })
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      message: `${e}`
    })
  }
});

app.post("/api/v1/update_whitelist", async (req, res) => {
  try {
    const { id, WHITELISTED_USERS } = req.body;
    console.log(id, WHITELISTED_USERS)
    var find = await db.whitelists.findOne({
      where: {
        id
      }
    })
    var data = await find.update({
      WHITELISTED_USERS
    })
    return res.status(200).json({
      data,
      message: "Successfully updated"
    })
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      message: `${e}`
    })
  }
});

app.post("/api/v1/delete_whitelist", async (req, res) => {
  try {
    const { id } = req.body;
    var find = await db.whitelists.findOne({
      where: {
        id
      }
    })
    await find.destroy()
    return res.status(200).json({
      message: "Successfully updated"
    })
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      message: `${e}`
    })
  }
});


app.post("/api/v1/save_token_data", async (req, res) => {
  try {
    const { id, decimals, name, address, symbol } = req.body;
    if (id) {
      var data = await db.tokendatas.findOne({
        where: {
          id
        }
      })
      if (data) {
        await data.update({
          decimals,
          name,
          address,
          symbol
        })

      }
      return res.status(200).json({
        data,
        message: "Successfully updated"
      })
    }
    else {
      const data = await db.tokendatas.create({
        decimals, name, address, symbol
      })
      return res.status(200).json({
        data,
        message: "Successfully updated"
      })
    }
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      message: `${e}`
    })
  }
});

app.post("/api/v1/delete_token_data", async (req, res) => {
  try {
    var { id } = req.body;

    console.log(id)
    var find = await db.tokendatas.findOne({
      where: {
        id
      }
    })

    if (req.body) {
      await find.destroy()
    }
    return res.status(200).json({
      message: "Successfully updated"
    })
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      message: `${e}`
    })
  }
});


db.sequelize.sync().then(() => {
  server.listen(port, async () => {

    await dataToConfigInstance.Main()
  })

});

