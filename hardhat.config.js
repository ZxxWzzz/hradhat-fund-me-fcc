require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("dotenv").config() // 确保 dotenv 库被正确加载
require("@nomicfoundation/hardhat-ethers")
require("hardhat-gas-reporter")
require("hardhat-deploy-ethers")

// const { ProxyAgent, setGlobalDispatcher } = require("undici")
// const proxyAgent = new ProxyAgent("http://127.0.0.1:7890")
// setGlobalDispatcher(proxyAgent)

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

// console.log("SEPOLIA_RPC_URL:", SEPOLIA_RPC_URL)
// console.log("PRIVATE_KEY:", PRIVATE_KEY)

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.24",
    defaultNetwork: "hardhat",

    networks: {
        hardhat: {
            chainId: 31337,
            // gasPrice: 130000000000,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 6,
            timeout: 2000000, // 增加超时时间
        },
    },

    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
    },

    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
        // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
    },

    mocha: {
        timeout: 100000000, // or any time value that suits your project
    },

    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        // coinmarketcap: COINMARKETCAP_API_KEY,
        token: "MATIC",
    },
}
