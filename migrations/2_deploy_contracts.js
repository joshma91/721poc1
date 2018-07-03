const SimpleStorage = artifacts.require('./SimpleStorage.sol')
const MyToken = artifacts.require("./MyToken.sol")

module.exports = async function (deployer) {
  deployer.deploy(SimpleStorage)
  await deployer.deploy(MyToken, "MyToken", "MYT")
  const myToken = await MyToken.deployed()
}
