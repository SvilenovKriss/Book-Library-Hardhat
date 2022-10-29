// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

//CONTRACT ADDRESS(GOERLI): 0x5fD9680E133631E2fA11f34fC963E28c27A4C299

contract BookLibrary is Ownable {
    event LogBookCreated(string name, uint256 copies);
    event LogBookBorrowed(address borrower);

    Book[] public books;
    mapping(address => UserBook[]) public userBook;
    address[] public userAddresses;

    struct Book {
        uint256 id;
        string name;
        uint256 availableBooksInStore;
    }

    struct UserBook {
        uint256 id;
        uint256 copiesTaken;
    }

    function getBooksLength() external view returns (uint256) {
        return books.length;
    }

    function getUserBooks() external view returns (uint256) {
        return userBook[msg.sender].length;
    }

    function addBook(string memory name, uint256 copies) external onlyOwner {
        Book memory _book = Book(books.length, name, copies);
        books.push(_book);
        emit LogBookCreated(name, copies);
    }

    function borrowBook(uint256 _id) external {
        require(books.length > _id, "Book doesn't exist!");
        require(
            books[_id].availableBooksInStore > 0,
            "There are no available books currently."
        );

        bool isUserBookExist = false;
        UserBook[] storage userBooks = userBook[msg.sender];

        for (uint256 i = 0; i < userBooks.length; i++) {
            if (userBooks[i].id == _id) {
                userBooks[i].copiesTaken++;
                isUserBookExist = true;
                break;
            }
        }

        if (userBook[msg.sender].length == 0) {
            userAddresses.push(msg.sender);
        }

        if (!isUserBookExist) {
            userBook[msg.sender].push(UserBook(_id, 1));
        }

        books[_id].availableBooksInStore--;
        emit LogBookBorrowed(msg.sender);
    }

    function returnBook(uint256 _index) external {
        require(
            userBook[msg.sender].length > _index,
            "Book doesn't exist in your collection!"
        );
        require(
            userBook[msg.sender][_index].copiesTaken > 0,
            "You need to add the book in order to return it!"
        );

        userBook[msg.sender][_index].copiesTaken--;
        books[userBook[msg.sender][_index].id].availableBooksInStore++;
    }
}
