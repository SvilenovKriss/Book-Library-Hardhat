import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as BookLibraryABI from '../artifacts/contracts/book-library.sol/BookLibrary.json';
import contractInteraction from "../utils/contract-interaction";

const contractAddress = '0x2b8e770134daf7F35ec0F5ef5d7C48fa3d6f277d';

const runTestnet = async (hre: HardhatRuntimeEnvironment) => {
    const provider = new hre.ethers.providers.InfuraProvider('goerli', process.env.INFURA_API_KEY);
    const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY || '', provider);
    const contract = new hre.ethers.Contract(contractAddress, BookLibraryABI.abi, wallet);

    await contractInteraction(contract, hre, wallet);
}

export default runTestnet;