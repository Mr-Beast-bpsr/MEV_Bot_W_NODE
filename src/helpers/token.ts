import { ContractCallContext, Multicall } from 'ethereum-multicall';
import { BigNumber, Contract, providers, Signer, Wallet } from 'ethers';
import { configs } from '../config2';
require('dotenv').config();

const WBNB_ADDRESS:any = process.env.WBNB_ADDRESS
const CONTRACT_ADDRESS:any = process.env.CONTRACT_ADDRESS
const PRIVATE_KEY:any = process.env.PRIVATE_KEY
const WSS_URL:any = process.env.WSS_URL

async function someFunction() {
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

// export const isStableToken = async (address: string) =>
//   // config.STABLE_TOKENS.some((t) => t.toLowerCase() === address.toLowerCase());

//   export const fetchTokenData = async (
//     provider: providers.JsonRpcProvider,
//     tokens: string[]
//   ) => {
//     let multicall = new Multicall({
//       ethersProvider: provider,
//       // contract:config.PANCAKE_ROUTER_ADDRESS,
//       tryAggregate: true,
//     });

//     let contractCallContext: ContractCallContext[] = tokens.map(
//       (contractAddress) => ({
//         reference: contractAddress,
//         contractAddress,
//         abi: [
//           {
//             constant: true,
//             inputs: [],
//             name: 'decimals',
//             outputs: [{ name: '', type: 'uint8' }],
//             payable: false,
//             stateMutability: 'view',
//             type: 'function',
//           },
//           {
//             constant: true,
//             inputs: [],
//             name: 'symbol',
//             outputs: [{ name: '', type: 'string' }],
//             payable: false,
//             stateMutability: 'view',
//             type: 'function',
//           },
//           {
//             constant: true,
//             inputs: [],
//             name: 'name',
//             outputs: [{ name: '', type: 'string' }],
//             payable: false,
//             stateMutability: 'view',
//             type: 'function',
//           },
//         ],
//         calls: [
//           {
//             reference: 'decimals',
//             methodName: 'decimals',
//             methodParameters: [],
//           },
//           {
//             reference: 'symbol',
//             methodName: 'symbol',
//             methodParameters: [],
//           },
//           {
//             reference: 'name',
//             methodName: 'name',
//             methodParameters: [],
//           },
//         ],

//       })
//     );


//     let { results } = await multicall.call(contractCallContext);




//     return tokens.map((token) => {
//       let { originalContractCallContext, callsReturnContext } = results[token];

//       // console.log(results[token], "generated")

//       // var data = {
//       //   decimals: callsReturnContext?.find((i) => i.methodName === 'decimals')
//       //     ?.returnValues[0],
//       //   symbol: callsReturnContext.find((i) => i.methodName == 'symbol')
//       //     ?.returnValues[0],
//       //   name: callsReturnContext.find((i) => i.methodName == 'name')
//       //     ?.returnValues[0],
//       //   address: originalContractCallContext.contractAddress.toLowerCase(),
//       // }
//       // console.log(data, "data")

//       return {
//         decimals: callsReturnContext?.find((i) => i.methodName === 'decimals')
//           ?.returnValues[0],
//         symbol: callsReturnContext.find((i) => i.methodName == 'symbol')
//           ?.returnValues[0],
//         name: callsReturnContext.find((i) => i.methodName == 'name')
//           ?.returnValues[0],
//         address: originalContractCallContext.contractAddress.toLowerCase(),
//       };
//     });
//   };

  export const getTokenBalance = async (
    provider: providers.JsonRpcProvider,
    // signer: any,
    token: string
  ) => {
    let contract = new Contract(
      token,
      ['function balanceOf(address account) public view returns (uint256)'],
      provider
    );
var config: any = await someFunction()


    return contract.balanceOf(config.CONTRACT_ADDRESS);
  };

  export const withdrawToken = async (
    provider: providers.JsonRpcProvider,
    token: string,
    amount?: BigNumber
  ) => {
    if (!amount) {
      let contract = new Contract(
        token,
        ['function balanceOf(address) view returns (uint)'],
        provider
      );
      amount = await contract.balanceOf(process.env.CONTRACT_ADDRESS);
    }

    let contract = new Contract(
      CONTRACT_ADDRESS,
      [
        {
          inputs: [
            {
              internalType: 'contract IERC20',
              name: '_token',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'withdrawToken',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      new Wallet(PRIVATE_KEY, provider)
    );

    return contract.withdrawToken(token, amount);
  };
