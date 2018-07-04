const MyToken = artifacts.require("./MyToken.sol")

module.exports = async function (deployer) {
  await deployer.deploy(MyToken, "MyToken", "MYT")
  const myToken = await MyToken.deployed()
}
