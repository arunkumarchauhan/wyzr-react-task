const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const db = require("./dboperations/db");
dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const app = express();
app.use(express.json());

app.post("/api/google-login", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();

  res.status(201);
  res.json({ name, email, picture });
});

app.get("/api/search/:term", async (req, res) => {
  const term = req.params.term;
  console.log("Inside");
  if (req.headers.hasOwnProperty("token")) {
    const ticket = await client.verifyIdToken({
      idToken: req.headers.token,
      audience: process.env.CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();
    db.insertUserKeyword(email, name, term);
  }
  await axios.get("https://www.googleapis.com/books/v1/volumes?q=" + term).then(
    function (response) {
      if ("items" in response.data) {
        if (response.data.items.length > 50) {
          data = response.data.items.slice(0, 50);
        } else {
          data = response.data.items;
        }
        res.status(200);
        res.json({ books: data });

        return res;
      }

      res.status(200);
      res.json({ books: null });
    },
    (error) => {
      console.log(error);
      res.status(500);
      res.json({ books: null });
      return res;
    }
  );
});

app.get("/api/book/:id", async (req, res) => {
  const bookId = req.params.id;

  await axios.get("https://www.googleapis.com/books/v1/volumes/" + bookId).then(
    function (response) {
      if (response.status >= 200 && response.status <= 300) {
        res.status(200);
        res.json(response.data);

        return res;
      } else {
        res.status(200);
        res.json(response.data);
        return res;
      }
    },
    (error) => {
      console.log(error);
      res.status(500);
      res.json(error);
      return res;
    }
  );
});

app.get("/api/stats", async (req, res) => {
  const bookId = req.params.id;

  try {
    db.select((result) => {
      res.status(200);
      res.json({ data: result });
      return res;
    });
  } catch (e) {
    res.status(500);
    res.json({ data: null });
    return res;
  }

});

app.use(express.static(path.join(__dirname, "/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/build/index.html"))
);

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is ready at http://localhost:${process.env.PORT || 5000}`
  );
});
