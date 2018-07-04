pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract MyToken is ERC721Token {

  constructor (string _name, string _symbol) public ERC721Token(_name, _symbol) {

  }

  function buyBook() public payable {
    require(msg.value == 1 ether);
    uint256 newTokenId = super.totalSupply() + 1; // make this incrementing
    super._mint(msg.sender, newTokenId);
  }

  function purchase() public payable {
  	require(msg.value == 1 ether);
  }


  function _purchase(uint256 _priceInWei) internal {
  	require(msg.value == _priceInWei);
  }

  /**
  * Custom accessor to create a unique token
  */
  function mintUniqueTokenTo(address _to, uint256 _tokenId, string  _tokenURI) public {
    super._mint(_to, _tokenId);
    super._setTokenURI(_tokenId, _tokenURI);
  }

  function purchaseAndMint(address _to, 
                          uint256 _tokenId, 
                          string _tokenURI,
                          uint256 priceInWei) public payable {
    _purchase(priceInWei);
    super._mint(_to,_tokenId);
    super._setTokenURI(_tokenId, _tokenURI);
  }
}

