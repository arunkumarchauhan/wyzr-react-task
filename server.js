const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const app = express();
app.use(express.json());

const users = [];

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}

app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  upsert(users, { name, email, picture });
  res.status(201);
  res.json({ name, email, picture });
});

app.post('/api/search', async (req, res) => {
  const { email,term } = req.body;
  await axios.get(
    "https://www.googleapis.com/books/v1/volumes?q="+term).then(function (response) {
      if(response.data.items.length>50){
      data=response.data.items.slice(0,50);}
    else{
      data=response.data.items;
    }
     
      res.status(201);
      res.json({ books:data });
     console.log(data[0]);
      return res
    }, (error) => {
      console.log(error);
      res.status(500);
      res.json({books:null});
      return res
    });
    
  
  
});


app.post('/api/book/:id', async (req, res) => {
  const bookId = req.params.id;
  const { email } = req.body;
  await axios.get(
    "https://www.googleapis.com/books/v1/volumes/"+bookId).then(function (response) {
      
      
      res.status(201);
      res.json(response.data);
      console.log(response.data);
      return res
    }, (error) => {
      console.log(error);
      res.status(500);
      res.json(error);
      return res
    });
    
  
  
});

app.use(express.static(path.join(__dirname, '/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/build/index.html'))
);

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is ready at http://localhost:${process.env.PORT || 5000}`
  );
});