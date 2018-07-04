const { json } = require('micro')
const getWeb3 = require('./utils/getWeb3')
const getAccounts = require('./utils/getAccounts')
const getContractInstance = require('./utils/getContractInstance')
const contractDefinition = require('../build/contracts/MyToken.json')

const web3 = getWeb3()
let accounts
let contract

getAccounts(web3).then(x => accounts = x)
getContractInstance(web3, contractDefinition).then(x => contract = x)

module.exports = async (req, res) => {
  // TODO - parse json sent up by client to get credentials
  const data = await json(req)
  console.log(data)
  
  // TODO - check to make sure the user credentials are valid
  // TODO - check to make sure the user has paid on the smart contract

  // check balance
  const tx = await contract.balanceOf.call(accounts[0], { from: accounts[0] })
  console.log('balanceOf:', tx.toString())

  return 'Here is your secret resource'
}
