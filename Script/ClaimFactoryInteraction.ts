import hre from "hardhat";
async function main() {
    const DEPLOYED_FACTORY_CONTRACT = 
    "0x724B6d297b3D2D5a0C4eA2f346B6104F2B9fb735";

    const myAccount = "0x265B06599e4C8dfE7e34612F628e783C84217191";
    const signer = await hre.ethers.getSigner(myAccount);
    const factoryContractInstance = await hre.ethers.getContractAt(
        "ClaimFaucetFactory",
        DEPLOYED_FACTORY_CONTRACT
    );
    // starting scripting
    console.log("#################### Deploying claim faucet #######################################")
    const deplyClaimFaucetTx1 = await factoryContractInstance
    .connect(signer)
    .deployedClaimFaucet("Lisk Token","LISK");
    deplyClaimFaucetTx1.wait();
    console.log({"Claim faucet 1 deployed to": deplyClaimFaucetTx1});

    const deplyClaimFaucetTx2 = await factoryContractInstance
    .connect(signer)
    .deployedClaimFaucet("Starknet Token","STRK");
    deplyClaimFaucetTx2.wait();
    console.log({"Claim faucet 2 deployed to": deplyClaimFaucetTx2});
    console.log("################ Getting the of length & data of depolyed claim faucet");

    const getLengthDeployedContract =
     await factoryContractInstance.getLengthDeployedContract();
    console.log({"length of claim faucets": getLengthDeployedContract.toString(),

    });
    const getUserContracts = await factoryContractInstance
    .connect(signer)
    .getUserDeployedContracts();
    console.table(getUserContracts);
    console.log("################################# getting user deployed claim faucet by index ###########################");

    const {deployer_: deployerA, deployedContract_: deployedContractA} = 
    await factoryContractInstance
    .connect(signer)
    .getUserDeployedContractByIndex(0);
    const {deployer_: deployerB, deployedContract_: deployedContractB} = 
    await factoryContractInstance
    .connect(signer)
    .getUserDeployedContractByIndex(1);
    console.log([
        {Deployer: deployerA, "Deloyed Contract Adresss": deployedContractA},
        {Deployer: deployerB, "Deloyed Contract Adresss": deployedContractB},

    ])
    console.log("#################### getting deployed contract info ############################")

    const ContractInfo = await factoryContractInstance.getInfoFromContract(
        deployedContractA
    );
    console.table(ContractInfo);
    const contractInfo2 = await factoryContractInstance.getInfoFromContract(
        deployedContractB
    );
    console.table(contractInfo2);
    console.log("###################### Claiming token anD getting user balance on the token ################################")

    const claimTokenFaucetTx2 = await factoryContractInstance
    .connect(signer)
    .claimFaucetFromFactory(deployedContractB);
    claimTokenFaucetTx2.wait();

    const checkUserBalForToken1 = await factoryContractInstance
    .connect(signer)
    .getBalanceFromDeployed(deployedContractA);
    
    const checkUserBalForToken2 = await factoryContractInstance
    .connect(signer)
    .getBalanceFromDeployed(deployedContractB);

    console.log({
        "Faucet 1 balance": hre.ethers.formatUnits(checkUserBalForToken1, 18),
        "Faucet 2 balance": hre.ethers.formatUnits(checkUserBalForToken2, 18)
    })
    }
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})