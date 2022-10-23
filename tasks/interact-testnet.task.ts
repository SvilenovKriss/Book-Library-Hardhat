import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import runTestnet from '../scripts/interact-testnet';

task("interact-testnet-script", "Interact with BookLibrary contract")
    .setAction(async (params, hre: HardhatRuntimeEnvironment): Promise<void> => {
        await runTestnet(hre);
    });