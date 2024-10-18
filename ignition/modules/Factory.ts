import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ClaimFaucetFactoryModule = buildModule("ClaimFaucetFactoryModule", (f) => {
  const claimFaucetFactory = f.contract("ClaimFaucetFactory");

  return { claimFaucetFactory };
});

export default ClaimFaucetFactoryModule;