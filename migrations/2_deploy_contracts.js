const MyToken = artifacts.require("./MyToken.sol")
const DSToken = artifacts.require("./DSToken.sol")

module.exports = async function (deployer) {
  await deployer.deploy(DSToken, "DAI")
  const dai = await DSToken.deployed()
  await deployer.deploy(MyToken, "MyToken", "MYT")
  // const myToken = await MyToken.deployed()
  // await myToken.setDaiAddress(DSToken.address, { gas: 200000 })
}
