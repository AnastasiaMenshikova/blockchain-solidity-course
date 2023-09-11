// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GenesisNft is ERC721Enumerable, Ownable {
    /**
     * @dev TOKEN_URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`.
     */
    string public constant TOKEN_URI =
        "ipfs://bafybeihkzb3nb27wrpewjyaj3nuqm5gldv6ibtibc7khdzc2ziqrg67awy";

    //  _price is the price of one Genesis NFT
    uint256 public _price = 0.01 ether;

    // _paused is used to pause the contract in case of an emergency
    bool public _paused;

    // max number of Genesis NFTs
    uint256 public maxTokenIds = 20;

    // total number of tokens minted
    uint256 public _tokenCounter;

    /* Events */
    event NftMinted(uint256 tokenId, uint256 price, address minter);

    modifier onlyWhenNotPaused() {
        require(!_paused, "Contract currently paused");
        _;
    }

    /**
     * @dev ERC721 constructor takes in a `name` and a `symbol` to the token collection.
     * name in our case is `Genesis NFT` and symbol is `GEN`.
     * Constructor for Genesis NFT takes in the baseURI to set TOKEN_URI for the collection.
     * It also initializes an instance of whitelist interface.
     */
    constructor() ERC721("Genesis NFT", "GEN") {}

    /**
     * @dev mint allows a user to mint 1 NFT per transaction after the presale has ended.
     */
    function mint() public payable onlyWhenNotPaused {
        require(
            _tokenCounter < maxTokenIds,
            "Exceed maximum Genesis NFT supply"
        );
        require(msg.value >= _price, "Ether sent is not correct");
        _tokenCounter += 1;
        _safeMint(msg.sender, _tokenCounter);
        emit NftMinted(_tokenCounter, _price, msg.sender);
    }

    /**
     * @dev setPaused makes the contract paused or unpaused
     */
    function setPaused(bool val) public onlyOwner {
        _paused = val;
    }

    /**
     * @dev withdraw sends all the ether in the contract
     * to the owner of the contract
     */
    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    /**
     * @dev _baseURI overides the Openzeppelin's ERC721 implementation which by default
     * returned an empty string for the baseURI
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return TOKEN_URI;
    }

    /* Getter Functions */

    /**
     * @dev returns the number of currently minted NFTs
     */
    function getTokenCounter() public view returns (uint256) {
        return _tokenCounter;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
