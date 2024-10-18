// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import {ClaimFaucet} from "./ClaimFauset.sol";
import {IERC20} from "./IERC20.sol";

contract ClaimFaucetFactory {
    struct DeployedContractInfo{

        address deployer;
        address deployedContract;
    }
    mapping (address => DeployedContractInfo[]) allUserDeployedContract;
    DeployedContractInfo[] allContract;
    function deployedClaimFaucet(string memory _name, string memory _symbol) external returns (address contractAddress_){
        require(msg.sender != address(0), "zero ddress not allowed");
        address _address = address(new ClaimFaucet(_name,_symbol));
        contractAddress_ = _address;
        DeployedContractInfo memory _deployedContract;
        _deployedContract.deployer = msg.sender;
        _deployedContract.deployedContract = _address;

        allUserDeployedContract[msg.sender].push(_deployedContract);
        allContract.push(_deployedContract);

    }
    function getAllContractDeployed() external  view returns(DeployedContractInfo[] memory) {
        return allContract;
    }

    function getUserDeployedContracts() external view returns (DeployedContractInfo[] memory)  {
        return allUserDeployedContract[msg.sender];
    }

    function getUserDeployedContractByIndex(uint8 _index) external view returns (address deployer_, address deployedContract_) {
        require(_index < allUserDeployedContract[msg.sender].length, "Out of bond");

        DeployedContractInfo memory _deployedContract = allUserDeployedContract[msg.sender][_index];

        deployer_ = _deployedContract.deployer;

        deployedContract_ = _deployedContract.deployedContract;
    }

   function getLengthDeployedContract() external view returns(uint256) {
        uint256 lens = allContract.length;
        return lens;
    }

    function getInfoFromContract(address _claimFaucet) external view returns (string memory, string memory) {
        return (IERC20(_claimFaucet).getTokenName(), IERC20(_claimFaucet).getSymbol());
}
function claimFaucetFromFactory(address _claimFaucet) external  {
        IERC20(_claimFaucet).claimToken(msg.sender);
    }
function  getBalanceFromDeployed (address _claimFaucet) external view  returns (uint256){
    uint256 userBal = IERC20(_claimFaucet).balanceOf(msg.sender);
    return userBal;
}
}