const Web3 = require('web3')

const getWeb3 = () => {
  const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545')
  const web3 = new Web3(provider)
  return web3
}

module.exports = getWeb3
