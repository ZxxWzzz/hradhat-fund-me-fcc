const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER, // 修改这里的拼写错误
} = require("../helper-hardhat-config")
const { contract } = require("ethers")
require("dotenv").config() // 确保 dotenv 库被正确加载

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if (developmentChains.includes(network.name)) {
        log("Local networks detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Mocks deployed")
        log("-------------------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
