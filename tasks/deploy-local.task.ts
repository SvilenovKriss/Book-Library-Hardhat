import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import deployLocal from "../scripts/deploy-local";

task("deploy-local", "Deploys contract on local node")
    .setAction(async (params, hre: HardhatRuntimeEnvironment) => {
        await deployLocal(hre);
    });