import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    query:'',
    searchedBooks: []
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.query !== prevState.query)
      BooksAPI.search(this.state.query).then((books) => {
        if(books !== undefined)
          if(books.hasOwnProperty("error"))
            books = [];
          this.setState({searchedBooks:books})
    })
  }

  updateQuery = (query) => {
    this.setState({query})
  }

  render() {
    let showingBooks = [];
      if (this.state.query) {
        showingBooks = this.state.searchedBooks;
      } else {
        showingBooks =  [];
      }

      showingBooks.sort(sortBy('name'));

    return(
      <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to='/'>Close</Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input
            type="text"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
            placeholder="Search by title or author"
            />

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">

          {showingBooks.map( (book, index) => (
              <li key={index}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.hasOwnProperty("imageLinks")? `url(${book.imageLinks.smallThumbnail})`: 'none' }}></div>
                  <div className="book-shelf-changer">
                    <select
                      value= {this.props.ownBooks.find((element) => book.id === element.id) === undefined?
                                       "none": (this.props.ownBooks.find((element) => book.id === element.id).shelf)}
                      id={index}
                      onChange={(evt) => this.props.addToShelf(book, evt)}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>)
          )}

        </ol>
      </div>
    </div>
    )
  }

}

export default SearchBooks
