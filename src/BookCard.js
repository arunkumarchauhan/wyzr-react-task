import { Button } from 'bootstrap';
import './App.css';
import { useState } from 'react';
import './BookDetail';

import Modal from 'react-modal';
import BookDetail from './BookDetail';

function BookCard(data){
const [isModalOpened,setIsModalOpened]=useState(false);
const openModal=()=> {
    
    console.log("IsOpen : ",!isModalOpened);
    setIsModalOpened(!isModalOpened);
  }

  function closeModal() {
    setIsModalOpened(false);
  }
    return  (
    
            <div className="card card-design col-3" >
          <img className="card-img-top card-image-design" src={data.volumeInfo.imageLinks.thumbnail} alt="Card image cap"/>
          <div className="card-block">
            <h4 className="card-title">{data.volumeInfo.title}</h4>
            <p className="card-text">{data.volumeInfo.authors[0]}</p>
          </div>
          <div className="card-block">
          </div>
          <button id="card-button" onClick={openModal}> View Details</button>

         <Modal isOpen={isModalOpened}
         onRequestClose={closeModal}
         >
                <BookDetail book={data}/>
            </Modal>
       
        </div>
     
       );

}

export default BookCard;