// contracts/GroundedCarbonFarms.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GroundedCarbonFarms is ERC721, VRFConsumerBase, Ownable {
    using SafeMath for uint256;
    using Strings for string;

    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
    address public VRFCoordinator;
    address public LinkToken;


    struct Farm {
        uint256 SoilOrganicCarbonContent;
        uint256 TonsOfOffset;
        string name;
    }

    Farm[] public Farms;

    mapping(bytes32 => string) RequestToFarmName;
    mapping(bytes32 => address) requestToSender;
    mapping(bytes32 => uint256) requestToTokenId;


    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyhash)
        public
        VRFConsumerBase(_VRFCoordinator, _LinkToken)
        ERC721("GroundedCarbonFarms", "CarbonOffset")
    {   
        VRFCoordinator = _VRFCoordinator;
        LinkToken = _LinkToken;
        keyHash = _keyhash;
        fee = 0.1 * 10**18; // 0.1 LINK
    }

    function requestNewRandomFarm(
        string memory name
    ) public returns (bytes32) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill contract with faucet"
        );
        bytes32 requestId = requestRandomness(keyHash, fee);
        RequestToFarmName[requestId] = name;
        requestToSender[requestId] = msg.sender;
        return requestId;
    }

    function GetTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber)
        internal
        override
    {
        uint256 newId = Farms.length;
        uint256 SoilOrganicCarbonContent = ((randomNumber % 10000) / 100 );
        uint256 TonsOfOffset = 0;


        Farms.push(
            Farm(
                SoilOrganicCarbonContent,
                TonsOfOffset,
                RequestToFarmName[requestId]

            )
        );
        _safeMint(requestToSender[requestId], newId);
    }

    function GetOffset(uint256 tokenId) public view returns (uint256) {
        return sqrt(Farms[tokenId].TonsOfOffset);
    }

    function GetNumberOfFarms() public view returns (uint256) {
        return Farms.length; 
    }

    function GetFarmOverView(uint256 tokenId)
        public
        view
        returns (
            string memory,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            Farms[tokenId].name,
            Farms[tokenId].SoilOrganicCarbonContent,
            GetOffset(tokenId),
            Farms[tokenId].TonsOfOffset
        );
    }

    function GetFarmStats(uint256 tokenId)
        public
        view
        returns (
            uint256,
            uint256
        )
    {
        return (
            Farms[tokenId].SoilOrganicCarbonContent,
            Farms[tokenId].TonsOfOffset
        );
    }

    function sqrt(uint256 x) internal view returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}
