import { expect } from "chai";
import { ethers } from "hardhat";
import { BookLibrary, BookLibrary__factory } from "../typechain-types";

interface Wallet {
    address: string;
}

describe("BookLibrary", function () {
    let owner: Wallet;
    let addrOne: Wallet;
    let bookLibraryFactory: BookLibrary__factory;
    let bookLibrary: BookLibrary;

    this.beforeEach(async () => {
        [owner, addrOne] = await ethers.getSigners()
        bookLibraryFactory = await ethers.getContractFactory("BookLibrary");
        bookLibrary = await bookLibraryFactory.deploy();

        await bookLibrary.deployed();
    });

    describe("Add new book", function () {
        it("Should create new book", async () => {
            await bookLibrary.addBook("Harry Potter", 20);
            const book = await bookLibrary.books(0);
            const bookLength = await bookLibrary.getBooksLength();

            expect(bookLength).to.equal(1);
            expect(book.id).to.equal(0);
            expect(book.name).to.equal("Harry Potter");

        });

        it("Should emit event for created new book", async () => {
            expect(await bookLibrary.addBook("Harry Potter", 20)).to.emit(bookLibrary, 'LogBookCreated');

        });
    });

    describe("borrowBook", () => {
        it(`Should throw error "Book doesn't exist!"`, async () => {
            await expect(bookLibrary.borrowBook(1)).to.revertedWith("Book doesn't exist!");
        });
        it(`Should throw error "There are no available books currently."`, async () => {
            await bookLibrary.addBook("Harry Potter", 0);
            await expect(bookLibrary.borrowBook(0)).to.revertedWith("There are no available books currently.");
        });
        it('Should borrow book successfully', async () => {
            await bookLibrary.addBook("Harry Potter", 5);

            expect(await bookLibrary.borrowBook(0)).to.emit(bookLibrary, 'LogBookBorrowed');

            const userBook = await bookLibrary.userBook(owner.address, 0);

            expect(await bookLibrary.getUserBooks()).to.equal(1);
            expect(userBook.copiesTaken).equal(1);
            expect(await bookLibrary.userAddresses(0)).to.equal(owner.address);
            expect((await bookLibrary.books(0)).availableBooksInStore).to.equal(4);
        });
        it('Should borrow book and increase copies taken', async () => {
            await bookLibrary.addBook("Harry Potter", 5);
            await bookLibrary.borrowBook(0);
            await bookLibrary.borrowBook(0);

            const userBook = await bookLibrary.userBook(owner.address, 0);

            expect(userBook.copiesTaken).to.equal(2);
        })
    });
    describe('returnBook', () => {
        it(`Should throw error: "Book doesn't exist in your collection!"`, async () => {
            await expect(bookLibrary.returnBook(1)).to.revertedWith("Book doesn't exist in your collection!");
        });
        it('Should return book successfully', async () => {
            await bookLibrary.addBook("Harry Potter", 5);
            await bookLibrary.borrowBook(0);
            await bookLibrary.returnBook(0);
            const userBook = await bookLibrary.userBook(owner.address, 0);

            expect(userBook.copiesTaken).to.equal(0);
        });
        it(`Should throw error: "You need to add the book in order to return it!"`, async () => {
            await bookLibrary.addBook("Harry Potter", 5);
            await bookLibrary.borrowBook(0);
            await bookLibrary.returnBook(0);

            await expect(bookLibrary.returnBook(0)).to.revertedWith("You need to add the book in order to return it!");
        });
    })
});