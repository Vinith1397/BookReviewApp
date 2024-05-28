import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css'; // Import the CSS file
import Login from './components/Login';
import Register from './components/Register';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import AddReview from './components/AddReview';

function App() {
  const [token, setToken] = useState('');

  const handleLogin = (token) => {
    setToken(token);
  };

  return (
    <Router>
      <div>
        <h1>Book Review System</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            {token && <li><Link to="/books">Books</Link></li>}
          </ul>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/books" element={token ? <BooksPage token={token} /> : <Navigate to="/login" />} />
            <Route path="/review/:isbn" element={<AddReview token={token} />} />
            <Route path="/" element={<BookList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const BooksPage = ({ token }) => {
  return (
    <div>
      <BookList token={token} />
      <BookDetails token={token} />
    </div>
  );
};

export default App;
