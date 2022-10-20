import { HardhatRuntimeEnvironment } from "hardhat/types";

async function deployLocal(hre: HardhatRuntimeEnvironment) {
    await hre.run('compile');

    const [deployer] = await hre.ethers.getSigners();

    console.log('Deploying contracts with the account:', deployer.address);
    console.log('Account balance:', (await deployer.getBalance()).toString());

    const BookLibrary = await hre.ethers.getContractFactory("BookLibrary");
    const bookLibraryContract = await BookLibrary.deploy();
    console.log('Waiting for BookLibrary deployment...');

    await bookLibraryContract.deployed();

    console.log('BookLibrary Contract address: ', bookLibraryContract.address);
    console.log('Done!');
}

export default deployLocal;