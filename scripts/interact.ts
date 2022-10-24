import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as BookLibraryABI from '../test/BookLibrary.json';
import contractInteraction from "../utils/contract-interaction";

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const run = async (hre: HardhatRuntimeEnvironment) => {
    const provider = new hre.ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
    const wallet = new hre.ethers.Wallet(process.env.HARDHAT_PRIVATE_KEY || '', provider);
    const contract = new hre.ethers.Contract(contractAddress, BookLibraryABI.abi, wallet);

    await contractInteraction(contract, hre, wallet);
}

export default run;