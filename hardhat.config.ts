import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

export interface ProcessEnv {
  [key: string]: string | undefined;
}
let env = process.env["NODE_ENV"];

const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY
  ? process.env.GOERLI_PRIVATE_KEY
  : "";

  const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
  ? process.env.ALCHEMY_API_KEY
  : "";


const config: HardhatUserConfig = {
  solidity: "0.8.1",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};

export default config;
