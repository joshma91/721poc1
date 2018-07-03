import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import getAccounts from './utils/getAccounts'
import getContractInstance from './utils/getContractInstance'
import contractDefinition from './contracts/MyToken.json'

import './App.css'

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()

      // Use web3 to get the user's accounts.
      const accounts = await getAccounts(web3)

      // Get the contract instance by passing in web3 and the contract definition.
      const contract = await getContractInstance(web3, contractDefinition)

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract }, this.runExample)
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`)
      console.log(error)
    }
  }

  runExample = async () => {
    const { accounts, contract } = this.state

    // Stores a given value, 5 by default.
    // await contract.set(5, { from: accounts[0] })
    
    // Get the value from the contract to prove it worked.
    //const response = await contract.get.call({ from: accounts[0] })

    // Update state with the result.
   // this.setState({ storageValue: response.toNumber() })
  }

  buyBook = async () => {
    const { accounts, contract, web3 } = this.state
    const tx = await contract.buyBook({ from: accounts[0], value: web3.utils.toWei("1", "ether"), gas: 1000000 })
    console.log(tx)
  }

  checkBalance = async () => {
    const { accounts, contract, web3 } = this.state
    const tx = await contract.balanceOf.call(accounts[0], { from: accounts[0] })
    console.log(tx.toString())
    if(tx.toNumber() > 0) {
      
    }
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    return (
      <div className="App">
        <button onClick={this.buyBook}>Click to Buy</button>
        <button onClick={this.checkBalance}>Click to Verify</button>
      </div>
    );
  }
}

export default App