/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookList({ token }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://book-review-app-467a5a193d3e.herokuapp.com/')
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the books!', error);
        setError('There was an error fetching the books');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('https://book-review-app-467a5a193d3e.herokuapp.com/')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the book list!', error);
      });
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      {books.map((book, index) => (
        <div key={index}>
          <h3>{book.title} by {book.author}</h3>
          <p>ISBN: {book.isbn}</p>
          {book.reviews && (
            <div>
              <h4>Reviews:</h4>
              <ul>
                {Object.entries(book.reviews).map(([username, review]) => (
                  <li key={username}><strong>{username}:</strong> {review}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default BookList;
