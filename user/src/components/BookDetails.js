import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookDetails({ token }) {
  const [isbn, setIsbn] = useState('');
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSearch = (searchType) => {
    setLoading(true);
    setMessage('');
    let url = '';
    let params = {};

    if (searchType === 'isbn') {
      url = `http://localhost:8080/isbn/${isbn}`;
    } else if (searchType === 'author') {
      url = `http://localhost:8080/author/${author}`;
    } else if (searchType === 'title') {
      url = `http://localhost:8080/title/${title}`;
    }

    axios.get(url, { params })
      .then(response => {
        if (Array.isArray(response.data)) {
          setBook(response.data[0]); // Assume the first book in the response
        } else {
          setBook(response.data);
        }
        return axios.get(`http://localhost:8080/review/${isbn || response.data.isbn}`);
      })
      .then(response => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch(error => {
        setMessage('');
        setLoading(false);
        console.error('There was an error fetching the book!', error);
      });
  };

  return (
    <div>
      <h2>Search for Book Details</h2>
      <div>
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="Search by ISBN"
        />
        <button onClick={() => handleSearch('isbn')}>Search by ISBN</button>
      </div>
      <div>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Search by Author"
        />
        <button onClick={() => handleSearch('author')}>Search by Author</button>
      </div>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search by Title"
        />
        <button onClick={() => handleSearch('title')}>Search by Title</button>
      </div>

      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      {book && (
        <>
          <h3>{book.title} by {book.author}</h3>
          <p>ISBN: {book.isbn}</p>
          <h4>Reviews</h4>
          <ul>
            {Object.entries(reviews).map(([username, review]) => (
              <li key={username}><strong>{username}:</strong> {review}</li>
            ))}
          </ul>
          {token && <Link to={`/review/${isbn}`}>Add/Update Review</Link>}
        </>
      )}
    </div>
  );
}

export default BookDetails;

