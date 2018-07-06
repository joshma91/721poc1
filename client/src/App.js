import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import getAccounts from './utils/getAccounts'
import getContractInstance from './utils/getContractInstance'
import contractDefinition from './contracts/MyToken.json'

import './App.css'

class App extends Component {
  state = { web3: null, accounts: null, contract: null }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3()
      const accounts = await getAccounts(web3)
      const contract = await getContractInstance(web3, contractDefinition)

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract })
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`)
      console.log(error)
    }
  }

  buyBook = async () => {
    const { accounts, contract, web3 } = this.state
    const tx = await contract.buyBook({ from: accounts[0], value: web3.utils.toWei("1", "ether"), gas: 1000000 })
    console.log(tx)
  }

  buyBookWithDai = async () => {

  }

  checkBalance = async () => {
    const { accounts, contract, web3 } = this.state
    const tx = await contract.balanceOf.call(accounts[0], { from: accounts[0] })
    console.log(tx.toString())
  }

  getBook = async () => {
    const res = await fetch("http://localhost:3001").then(x => x.text())
    console.log(res)
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    return (
      <div className="App">
        <button onClick={this.buyBookWithDai}>Buy With Dai</button>
        <button onClick={this.buyBook}>Click to Buy</button>
        <button onClick={this.checkBalance}>Check Balance of NFT</button>
        <button onClick={this.getBook}>Get Book</button>
      </div>
    );
  }
}

export default App