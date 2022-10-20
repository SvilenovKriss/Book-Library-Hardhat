import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as dotenv from 'dotenv'

dotenv.config();

interface ErrorMessage {
  message: string;
}

async function main(hre: HardhatRuntimeEnvironment): Promise<void> {
  await hre.run('compile');

  const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY || '', hre.ethers.provider)
  console.log('Account balance:', (await wallet.getBalance()).toString());

  const BookLibrary = await hre.ethers.getContractFactory("BookLibrary");
  const library = await BookLibrary.deploy();

  console.log('Waiting for contract to deploy...');

  await library.deployed();

  await new Promise(() => {
    setTimeout(async () => {
      console.log('Waiting contract to be verified on etherscan');
      try {
        console.log("Verifying contract...");
        await hre.run("verify:verify", {
          address: library.address,
        });
      } catch (err: (ErrorMessage | any)) {
        if (err.message.includes("Reason: Already Verified")) {
          await hre.run('print', { address: library.address });
        }
      }
    }, 60000);
  });
}

export default main;
