pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "./DSToken.sol";

contract MyToken is ERC721Token {

  address daiAddress;

  constructor (string _name, string _symbol) public ERC721Token(_name, _symbol) {
  }


  function setDaiAddress(address _addr) public {
    daiAddress = _addr;
  }

  function buyBook() public payable {
    require(msg.value == 1 ether);
    uint256 newTokenId = super.totalSupply() + 1;
    super._mint(msg.sender, newTokenId);
  }

  function getDaiAddress() public returns (address) {
    return daiAddress;
  }

  function buyBookWithDai() public payable {
    DSToken dai = DSToken(daiAddress);
    require(dai.transferFrom(msg.sender, address(this), 1));
    uint256 newTokenId = super.totalSupply() + 1;
    super._mint(msg.sender, newTokenId);
  }
}

