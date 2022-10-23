import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as BookLibraryABI from '../artifacts/contracts/book-library.sol/BookLibrary.json';
import contractInteraction from "../utils/contract-interaction";

const deployerPrivateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const run = async (hre: HardhatRuntimeEnvironment) => {
    const provider = new hre.ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
    const wallet = new hre.ethers.Wallet(deployerPrivateKey, provider);
    const contract = new hre.ethers.Contract(contractAddress, BookLibraryABI.abi, wallet);

    await contractInteraction(contract, hre, wallet);
}

export default run;