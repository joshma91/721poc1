const MyToken = artifacts.require("./MyToken.sol")
const DSToken = artifacts.require("./DSToken.sol")

module.exports = async function (deployer) {
  await deployer.deploy(DSToken, "DAI")
  await deployer.deploy(MyToken, "MyToken", "MYT")
}
