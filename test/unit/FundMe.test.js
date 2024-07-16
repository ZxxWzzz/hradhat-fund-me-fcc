const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe
          let deployer
          let mockV3Aggregator

          const sendValue = "1000000000000000000"

          beforeEach(async function () {
              //deploy our fundMe contract
              //using Hardhat-deploy
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              fundMe = await ethers.getContract("FundMe", deployer)
              mockV3Aggregator = await ethers.getContract(
                  "MockV3Aggregator",
                  deployer
              )
          })

          // describe("FundMe", async function () {
          //     it("sets the aggregator address correctly", async function () {
          //         const response = await fundMe.priceFeed()
          //         assert.equal(
          //             response,
          //             mockV3Aggregator.address,
          //             "The priceFeed address does not match the expected address"
          //         )
          //     })
          // })

          describe("fund", async function () {
              it("Fails if don't send enough ETH", async function () {
                  await expect(fundMe.fund()).to.be.revertedWith(
                      "You need to spend more ETH!"
                  )
              })
              it("updated the amount funded data structure", async function () {
                  await fundMe.fund({ value: sendValue })
                  const response = await fundMe.getAddressToAmountFunded(
                      deployer
                  )
                  assert.equal(response.toString(), sendValue.toString())
              })
              it("Adds funder to array of getFunder", async function () {
                  await fundMe.fund({ value: sendValue })
                  const funder = await fundMe.getFunder(0)
                  assert.equal(funder, deployer)
              })
          })
          // describe("withdraw", async function () {
          //     beforeEach(async function () {
          //         await fundMe.fund({ value: sendValue })
          //     })
          //     it("Withdraw ETH from a single founder", async function () {
          //         //Arrange
          //         const startingFundMeBalance = await fundMe.provider.getBalance(
          //             fundMe.address
          //         )
          //         const startingDeployerBalance = await fundMe.provider.getBalance(
          //             deployer
          //         )
          //         //Act
          //         const transactionResponse = await fundMe.withdraw()
          //         const transactionReceipt = await transactionResponse.wait(1)
          //         const { gasUsed, effectiveGasPrice } = transactionReceipt
          //         const gasCost = gasUsed.mul(effectiveGasPrice)

          //         const endingFundMeBalance = await ethers.provider.getBalance(
          //             fundMe.address
          //         )
          //         const endingDeployerBalance = await ethers.provider.getBalance(
          //             deployer
          //         )
          //         //gasCost
          //         //Assert
          //         assert.equal(endingFundMeBalance, 0)
          //         assert.equal(
          //             startingFundMeBalance.add(startingDeployerBalance).toString(),
          //             endingDeployerBalance.add(gasCost).toString()
          //         )
          //     })
          // })
      })
