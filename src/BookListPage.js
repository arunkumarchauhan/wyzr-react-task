import { Button } from 'bootstrap';
import './App.css';
import './BookCard';
import BookCard from './BookCard';




const getCard=(data)=>{
    
    return  (
        <div className="card card-design col-3" >
          <img className="card-img-top card-image-design" src={data.volumeInfo.imageLinks.thumbnail} alt="Card image cap"/>
          <div className="card-block">
            <h4 className="card-title">{data.volumeInfo.title}</h4>
            <p className="card-text">{data.volumeInfo.authors[0]}</p>
          </div>
          <div className="card-block">
            <Button onClick={data.selfLink} className="card-link">View Details</Button>
          </div>
        </div>
       );
  
   
}

function BookListPage({data}) {
  
    return (
<div className="row">
{
    data.map((element )=> 
      BookCard(element)
    )
}
</div>

    );
}
export default BookListPage;