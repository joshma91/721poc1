pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract MyToken is ERC721Token {

  constructor (string _name, string _symbol) public ERC721Token(_name, _symbol) {

  }

  function buyBook() public payable {
    require(msg.value == 1 ether);
    uint256 newTokenId = super.totalSupply() + 1;
    super._mint(msg.sender, newTokenId);
  }
}

