// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MultiToken is ERC1155 {
    constructor()
        ERC1155(
            "https://ipfs.io/ipfs/QmNoRJAgUie29jxtX4ZkbaA582wJNeRE6e56eCCAk82NCH/{id}.json"
        )
    {}

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts
    ) internal override {
        require(from == address(0), "Token not transferable");
        super._update(from, to, ids, amounts);
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public {
        _mintBatch(to, ids, amounts, data);
    }

    function uri(
        uint256 _tokenId
    ) public pure override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "https://ipfs.io/ipfs/QmNoRJAgUie29jxtX4ZkbaA582wJNeRE6e56eCCAk82NCH/",
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }
}
