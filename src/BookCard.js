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
          <img className="card-img-top card-image-design" src={data.volumeInfo.hasOwnProperty("imageLinks") ?data.volumeInfo.imageLinks.thumbnail:null} alt="Image Not FOund"/>
          <div className="card-block">
            <h4 className="card-title">{data.volumeInfo.title}</h4>
            <p className="card-text">{data.volumeInfo.hasOwnProperty('authors')?data.volumeInfo.authors:""}</p>
          </div>
          <div className="card-block">
          </div>
          <button type="button" class="btn btn-primary" id="card-button" onClick={openModal}> View Details</button>

         <Modal isOpen={isModalOpened}
         onRequestClose={closeModal}
         
         >
                <BookDetail bookId={data.id}/>
            </Modal>
       
        </div>
     
       );

}

export default BookCard;