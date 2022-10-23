import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import run from '../scripts/interact';

task("interact", "Interact with BookLibrary contract")
    .setAction(async (params, hre: HardhatRuntimeEnvironment): Promise<void> => {
        await run(hre);
    });