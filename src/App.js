import React from "react";
import Header from "./conponents/Header";
import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import Shelves from "./conponents/Shelves";
import Book from "./conponents/Book";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([])
  const [mergeBooks, setMergeBooks] = useState([])
  const [mapOfIdToBook, setMapOfBookIds] = useState([])

  const [querry, setQuerry] = useState("")

  // Get all data and setBooks
  useEffect(() => {
    BooksAPI.getAll()
      .then(data => {
        setBooks(data)
        setMapOfBookIds(createMapOfBookIds(data))
      })
  }, [])

  // Search book
  useEffect(() => {
    if (querry) {
      BooksAPI.search(querry, 10)
        .then(data => {
          if (data.error) {
            setSearchBooks([])
          } else {
            console.log(data);
            setSearchBooks(data)
          }
        })
    }

    return () => {
      setSearchBooks([])
    }
  }, [querry])

  // Update book shelf
  const updateBookShelf = (book, shelfValue) => {
    console.log("update book");
    const updateBook = books.map(b => {
      if (book.id === b.id) {
        book.shelf = shelfValue
      }
      return b;
    })
    setBooks(updateBook)

    // Call API update
    BooksAPI.update(book, shelfValue)
  }

  // Create book ids map 
  const createMapOfBookIds = (books) => {
    const result = new Map()
    books.map(book => result.set(book.id, book))

    return result
  }

  useEffect(() => {
    const comnbined = searchBooks.map(book => {
      if (mapOfIdToBook.has(book.id)){
        return mapOfIdToBook.get(book.id)
      } else {
        return book
      }
    })
    setMergeBooks(comnbined)
  }, [searchBooks])

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
              href="/"
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={querry}
                onChange={e => setQuerry(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {
                mergeBooks.map(bk => (
                  <li key={bk.id}>
                    <Book book={bk} updateBookShelf={updateBookShelf} />
                  </li>
                ))
              }
            </ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <Header />
          <div className="list-books-content">
            <Shelves books={books} updateBookShelf={updateBookShelf} />
          </div>
          <div className="open-search">
            <a onClick={() => (setShowSearchpage(!showSearchPage))}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
