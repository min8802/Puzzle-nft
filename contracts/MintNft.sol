// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MintNft is ERC1155 {
    string public name;
    string public symbol;
    string metadataUri;

    constructor (string memory _name, string memory _symbol, string memory _metadataUri) ERC1155("") {
        name = _name;
        symbol = _symbol;
        metadataUri = _metadataUri;
    }

    function mintNft(uint _tokenId, uint _amount) public {
        require(_tokenId < 17, "Not exist token.");

        _mint(msg.sender, _tokenId, _amount, "");
    }

    function uri(uint _tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(metadataUri, Strings.toString(_tokenId), ".json"));
    }

    function balanceOfNfts(address _owner) public view returns (uint[16] memory) {
        uint[16] memory result;

        for(uint i = 0; i < 16; i++) {
            result[i] = balanceOf(_owner, i + 1);
        }

        return result;
    }
}