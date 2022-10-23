import { HardhatRuntimeEnvironment } from "hardhat/types";

interface Wallet {
    address: string;
}

const contractInteraction = async (contract: any, hre: HardhatRuntimeEnvironment, wallet: Wallet) => {
    const transactionCreateBook = await contract.addBook("The Intelligent Investor", 5);
    const transactionReciept = await transactionCreateBook.wait();

    if (transactionReciept.status !== 1) {
        console.log("Transaction failed!");
        return;
    }

    const book = await contract.books(0);
    console.log(`Book added: ${book.name}`)

    const booksLength = hre.ethers.BigNumber.from(await contract.getBooksLength());

    console.log('Available books:');
    for (let i = 0; i < booksLength.toNumber(); i++) {
        console.log(`Book: ${(await contract.books(i)).name}`);
    }

    const transactionBorrowBook = await contract.borrowBook(0);
    const borrowBookReceipt = await transactionBorrowBook.wait();

    if (borrowBookReceipt.status !== 1) {
        console.log('Borrow book transaction failed');
        return;
    }

    const rentedBook = await contract.userBook(wallet.address, 0);

    if (rentedBook.copiesTaken.toString() === '1') {
        console.log(`Book "${book.name}" successfully borrowed`);
    }

    const transactionReturnBook = await contract.returnBook(0);
    const txReturnBookReceipt = await transactionReturnBook.wait();

    if (txReturnBookReceipt.status !== 1) {
        console.log('Return book tansaction failed!');
        return;
    }

    console.log('Book returned');
    console.log(`Available books from borrowed book: ${(await contract.books(0)).availableBooksInStore}`);
}

export default contractInteraction;