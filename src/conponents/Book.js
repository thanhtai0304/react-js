import React from "react";

const shelves = [
    {
        id: "1",
        shelfName: "currentlyReading",
        shelfDisplayName: "Currently Reading"
    },
    {
        id: "2",
        shelfName: "wantToRead",
        shelfDisplayName: "Want to Read"
    },
    {
        id: "3",
        shelfName: "read",
        shelfDisplayName: "Read"
    },
    {
        id: "4",
        shelfName: "none",
        shelfDisplayName: "None"
    },
]
const Book = (props) => {
    const { book, updateBookShelf } = props

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                            `url("${book?.imageLinks?.thumbnail}")`,
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select
                        defaultValue={(book.shelf) ? (book.shelf) : "none"}
                        onChange={(e) => updateBookShelf(book, e.target.value)}
                    >
                        <option key="0" value="move" disabled>Move to...</option>
                        {shelves.map(shelf => (
                            <option key={shelf.id} value={shelf.shelfName} >{shelf.shelfDisplayName}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
    )
}

export default Book;