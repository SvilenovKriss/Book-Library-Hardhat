import { subtask, task } from "hardhat/config";
import { string } from "hardhat/internal/core/params/argumentTypes";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import main from "../scripts/deploy-testnet";

interface Args {
    address: string;
}

task("deploy-testnet", "Deploys contract on a provided network")
    .setAction(async (params, hre: HardhatRuntimeEnvironment): Promise<void> => {
        await main(hre);
    });

subtask("print", "Prints information after deployment")
    .addParam("address", "Address of contract")
    .setAction(async (args: Args): Promise<void> => {
        console.log(`Contract deployed at address: ${args.address}!`)
        console.log('Contract Verified!');
    })