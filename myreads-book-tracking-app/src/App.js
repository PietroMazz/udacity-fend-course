import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'

import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  addToShelf = (book, evt) => {
    book.shelf = evt.target.value;
    if(this.state.books.find((aux) => book.id === aux.id)) {
      this.setState(state => ({
        books: state.books.filter((aux) => book.id !== aux.id).concat([book])
      }))
      BooksAPI.update(book, book.shelf);
    } else {
      this.setState( state => ({
        books: state.books.concat([book])
      })  );
      BooksAPI.update(book, book.shelf);
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books})
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() =>
          (<SearchBooks ownBooks={this.state.books} addToShelf={this.addToShelf}/>)
        }/>
      <Route exact path='/' render={() =>
          (<ListBooks books={this.state.books} addToShelf={this.addToShelf}/>)
        }/>
      </div>
    )
  }
}

export default BooksApp
