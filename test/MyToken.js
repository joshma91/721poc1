const MyToken = artifacts.require("MyToken");

contract('Testing MyToken contract', function(accounts) {

    let token;
    const name = "MyCrazyToken";
    const symbol = "MCT"

    const account1 = accounts[1]
    const tokenId1 = 1111;
    const tokenUri1 = "This is data for the token 1"; // Does not have to be unique

    const account2 = accounts[2]
    const tokenId2 = 2222;
    const tokenUri2 = "This is data for the token 2"; // Does not have to be unique

    const account3 = accounts[3]
    const tokenId3 = 3333;
    const tokenUri3 = "This is data for the token 3"

    it('should be able to deploy and mint ERC721 token', async () => {
      token = await MyToken.new(name, symbol)
      await token.mintUniqueTokenTo(account1, tokenId1, tokenUri1, {from: accounts[0]})

      expect(await token.symbol()).to.equal(symbol)
      expect(await token.name()).to.equal(name)
    })

    it('should pay into contract', async () => {
      const payNotEnough = () => token.purchase({from: account2, value: web3.toWei(0.5, "ether")})
      expectRevert(payNotEnough)

      const payTooMuch = () => token.purchase({from: account2, value: web3.toWei(1.5, "ether")})
      expectRevert(payTooMuch)

      const payJustEnough = () => token.purchase({from: account2, value: web3.toWei(1, "ether")})
      payJustEnough()
    })

    it('should not be able to mint a token with an existing tokenID', async () => {
      const duplicateTokenID = () => token.mintUniqueTokenTo(account2, tokenId1, tokenUri2, {from: accounts[0]})
      expectRevert(duplicateTokenID)
    })

    it('should allow creation of multiple unique tokens and manage ownership', async () => {
      const additionalToken = await token.mintUniqueTokenTo(account2, tokenId2, tokenUri2, {from: accounts[0]})
      expect(Number(await token.totalSupply())).to.equal(2)

      // check for token existence
      expect(await token.exists(tokenId1)).to.be.true
      expect(await token.exists(tokenId2)).to.be.true
      expect(await token.exists(9999)).to.be.false // Dummy tokenId

      // check for token ownership
      expect(await token.ownerOf(tokenId1)).to.equal(account1)
      expect(await token.ownerOf(tokenId2)).to.equal(account2)
    })

    it('should allow safe transfers', async () => {
      // token ID 9999 does not exist
      const unownedTokenId = () => token.safeTransferFrom(account2, account3, 9999, {from: accounts[2]}) // tokenId
      expectRevert(unownedTokenId)

      // account 1 does not hold tokenId2
      const wrongOwner = () => token.safeTransferFrom(account1, account3, tokenId2, {from: accounts[1]}) // wrong owner
      expectRevert(wrongOwner)

      // Notice that the "from" account needs to be the token owner or else it fails
      const wrongFromGas = () => token.safeTransferFrom(account2, account3, tokenId2, {from: accounts[1]}) // wrong owner
      expectRevert(wrongFromGas)

      // successful transfer
      await token.safeTransferFrom(account2, account3, tokenId2, {from: accounts[2]})
      expect(await token.ownerOf(tokenId2)).to.equal(account3)
    })

    it('should issue a token after paying', async () => {
      // paying too little
      const payNotEnough = () => token.purchaseAndMint(account3, tokenId3, tokenUri3, web3.toWei(1, "ether"), {from: account2, value: web3.toWei(0.5, "ether")})
      expectRevert(payNotEnough)

      // paying too much
      const payTooMuch = () => token.purchaseAndMint(account3, tokenId3, tokenUri3, web3.toWei(1, "ether"), {from: account3, value: web3.toWei(1.5, "ether")})
      expectRevert(payTooMuch)

      const payJustEnough = () => token.purchaseAndMint(account3, tokenId3, tokenUri3, web3.toWei(1, "ether"), {from: account3, value: web3.toWei(1, "ether")})
      payJustEnough();

      // check for token existence
      expect(await token.exists(tokenId3)).to.be.true
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