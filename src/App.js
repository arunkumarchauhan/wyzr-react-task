import './App.css';
import GoogleLogin from 'react-google-login';
import { useState } from 'react';
import BookListPage from './component/BookListPage';


function App() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );
  const [bookData,setBookData]=useState(null);
  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogin = async (googleData) => {
    console.log(googleData);
    const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
    localStorage.setItem('token',googleData.tokenId);
  };
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    localStorage.removeItem('token');
    setLoginData(null);
    setBookData(null);
  };

  const getBookData = async () => {
    if(!loginData){
      alert("Please Login First");
      return;
    }
    const search_term=document.getElementById("searchInput").value;
    const res = await fetch('/api/search/'+search_term, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem("token")

      },
    });

    const data = await res.json();
    
    setBookData(data.books);
    
  };

  return (
    <div className='app' >
      
      <header className='header' >       
        <div>
          {loginData ? (
            <div className='row' >
             <p id="userText">Hi, {loginData.name}</p>
              <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
          )}
        </div>
      </header>
      
      <div className='search-box row'>
        <input type="text" id="searchInput"  placeholder='Search Keyword Here'/>
        <button type="button" id="searchButton" className="btn btn-success" onClick={getBookData}>Search</button>
      </div>
            <br/>
        <div className='book-list'>
          {
            
            bookData?<BookListPage data={bookData}/>:<p>Enter Proper Keyword to search</p>
          }
        </div>
        <br/>
      
    </div>
  );
}

export default App;