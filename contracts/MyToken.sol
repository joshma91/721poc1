pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "./DSToken.sol";

contract MyToken is ERC721Token {

  address daiAddress;
  address _owner;

  constructor (string _name, string _symbol) public ERC721Token(_name, _symbol) {
    _owner = msg.sender;
  }

  modifier isOwner() {
    require(msg.sender == _owner);
    _;
  }

  function setDaiAddress(address _addr) public isOwner {
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
    bool daiTransferSuccessful;

    DSToken dai = DSToken(daiAddress);
    daiTransferSuccessful = dai.transferFrom(msg.sender, this, 1);
    require(daiTransferSuccessful);

    uint256 newTokenId = super.totalSupply() + 1;
    super._mint(msg.sender, newTokenId);
  }
}

