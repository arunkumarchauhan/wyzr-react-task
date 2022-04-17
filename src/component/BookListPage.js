import { Button } from 'bootstrap';
import ".././App.css";
import './BookCard';
import BookCard from './BookCard';




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