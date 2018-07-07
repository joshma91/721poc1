const MyToken = artifacts.require("MyToken");
const DSToken = artifacts.require("DSToken");

contract('Testing MyToken contract', function(accounts) {
  let daiToken 
  let bookToken 

  it('should have issued DAI tokens after minting', async () => {

    daiToken = await DSToken.new("DAI")
    bookToken = await MyToken.new("MyBookToken", "MBT")

    // mint new DAI tokens to accounts[0]
    await daiToken.mint(100000, { from: accounts[0] })
    const balance = await daiToken.balanceOf.call(accounts[0], { from: accounts[0] })
    
    expect(balance.toNumber()).to.equal(100000)
  })
  
  it('should use approved DAI tokens to purchase an MBT', async () => {
    
    // approval for retrieval of 1 Dai from bookToken contract
    daiToken.approve(bookToken.address, 1, { from: accounts[0] })
    
    const before = await bookToken.balanceOf.call(accounts[0], { from: accounts[0] })

    await bookToken.setDaiAddress(daiToken.address)
    await bookToken.buyBookWithDai({ from: accounts[0] })
    
    const after = await bookToken.balanceOf.call(accounts[0], { from: accounts[0] })
    const daiBalanceAfter = await daiToken.balanceOf.call(accounts[0], { from: accounts[0] })

    expect(before.toNumber()).to.equal(0)
    expect(after.toNumber()).to.equal(1)
    expect(daiBalanceAfter.toNumber()).to.equal(99999)
    
  })

  it('should ensure that the DAI address is being set properly', async () => {
    const daiAddress = await bookToken.getDaiAddress.call({ from: accounts[0] });
    expect(daiAddress == daiToken.address);
  })

  it('should pay 1 ETH into contract and buy a NFT representing the purchase', async () => {
   
    const before = await bookToken.balanceOf.call(accounts[1], { from: accounts[1] })
    
    await bookToken.buyBook({ from: accounts[1], value: web3.toWei("1", "ether") })
    
    const after = await bookToken.balanceOf.call(accounts[1], { from: accounts[1] })

    expect(before.toNumber()).to.equal(0)
    expect(after.toNumber()).to.equal(1)
  })

})

// custom util for expecting reverts
async function expectRevert(fn) {
  let errorMsg = "__no error message__"

  try {
    await fn()
  } catch (err) {
    errorMsg = err.message
  }

  expect(errorMsg).to.equal('VM Exception while processing transaction: revert')
}