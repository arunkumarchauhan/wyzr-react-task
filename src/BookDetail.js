import './App.css';
function BookDetail({book}){
    
    return(
<div className="container book-card-design">
    <div className="card">
        <div className="card-body">
            <h3 className="card-title">{book.volumeInfo.title}</h3>
            <h6 className="card-subtitle">{book.volumeInfo.subtitle}</h6>
            <br/>
            <div className="row">
                <div className="col-lg-5 col-md-5 col-sm-6">
                    <div className="white-box text-center"><img src={book.volumeInfo.imageLinks.thumbnail} className="img-responsive"/></div>
                </div>

                <div className="col-lg-7 col-md-7 col-sm-6">
                    <h4 className="box-title mt-5">Book description</h4>
                    <p>{book.volumeInfo.description}</p>
                   
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <h3 className="box-title mt-5">General Info</h3>
                    <div className="table-responsive">
                        <table className="table table-striped table-product">
                            <tbody>
                            <tr>
                                    <td width="390">Title</td>
                                    <td>{book.volumeInfo.title} : {book.volumeInfo.subtitle}</td>
                                </tr>
                                <tr>
                                    <td width="390">Authors</td>
                                    <td>{book.volumeInfo.authors}</td>
                                </tr>
                                <tr>
                                    <td>Publishers</td>
                                    <td>{book.volumeInfo.publisher}</td>
                                </tr>
                                <tr>
                                    <td>Published Date</td>
                                    <td>{book.volumeInfo.publishedDate}</td>
                                </tr>
                                <tr>
                                    <td>ISBN</td>
                                    <td>{book.volumeInfo.industryIdentifiers.map((elem)=>elem.identifier+", ")}</td>
                                </tr>
                                <tr>
                                    <td>Categories</td>
                                    <td>{"categories" in book.volumeInfo?
                                    
                                        book.volumeInfo.categories.map((e)=><p>{e}</p>):null}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Page Count</td>
                                    <td>{book.volumeInfo.pageCount}</td>
                                </tr>
          
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
);

}

export default BookDetail;