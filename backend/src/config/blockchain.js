const { ethers } = require('ethers');
require('dotenv').config();

let provider, wallet, contract;

const initBlockchain = (abi) => {
  provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);
  return contract;
};

module.exports = { initBlockchain };