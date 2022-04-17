import './App.css';

import LoadingSpinner from './LoadingSpinner';
import React, { useState, useEffect } from 'react';
import './BookWidget';
import BookWidget from './BookWidget';

function BookDetail({bookId}){
    const [book, setBook] = useState(null);
    useEffect(() => {
        console.log("BookId "+bookId);
       const loginData=localStorage.getItem('loginData');
        const fetchData = async () => {
          const result = await fetch('/api/book/'+bookId, {
            method: 'POST',
            body: JSON.stringify({
              email:loginData.email, 
              term:document.getElementById("searchInput").value
            }),
            headers: {
              'Content-Type': 'application/json',
              
            },
          });
          const data = await result.json();
         console.log(data);
          setBook(data);
        };
    fetchData();
        
      },[bookId]);

    return(<div>{book? <BookWidget book={book}/>:<LoadingSpinner/>}</div>);

}

export default BookDetail;