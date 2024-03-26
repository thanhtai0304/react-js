import React from "react";
import Shelf from "./Shelf";

const Shelves = (props) => {
    const { books, updateBookShelf } = props
    const currentlyReading = books.filter((book) => book.shelf === "currentlyReading" || book.shelf === undefined);
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");
    return (
        <div>
            <Shelf key="currentlyReading" title="Currently Reading" books={currentlyReading} updateBookShelf={updateBookShelf} />
            <Shelf key="wantToRead" title="Want To Read" books={wantToRead} updateBookShelf={updateBookShelf} />
            <Shelf key="read" title="Read" books={read} updateBookShelf={updateBookShelf} />
        </div>
    )
}

export default Shelves;