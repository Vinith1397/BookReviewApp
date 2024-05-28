
/*import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AddReview({ token }) {
  const { isbn } = useParams();
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!review) {
      setMessage('Review cannot be empty');
      return;
    }

    try {
      console.log(`Submitting review for ISBN: ${isbn} with token: ${token}`);
      const response = await axios.put(`http://localhost:8080/customer/auth/review/${isbn}`, { review }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('Review submitted successfully');
      navigate(`/book`); // Navigate back to the book details page after successful submission
    } catch (error) {
      console.error('There was an error submitting the review:', error);
      setMessage('error submitting the review ');
    }
  };

  return (
    <div>
      <h2>Add/Update Review for ISBN: {isbn}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddReview;


*/


import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AddReview({ token }) {
  const { isbn } = useParams();
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!review) {
      setMessage('Review cannot be empty');
      return;
    }
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    console.log('Headers being sent:', headers);

    try {
      console.log(`Submitting review for ISBN: ${isbn} with token: ${token}`);
      const response = await axios.put(`http://localhost:8080/customer/auth/review/${isbn}`, { review }, {
        headers: {
          'Authorization': `${token}`
        }
      });
      setMessage('Review submitted successfully');
      navigate(`/books`); // Navigate back to the book details page after successful submission
    } catch (error) {
      console.error('There was an error submitting the review:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
        setMessage(`Error: ${error.response.data.message || 'Unable to submit review'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request data:', error.request);
        setMessage('Error: No response from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Add/Update Review for ISBN: {isbn}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddReview;
