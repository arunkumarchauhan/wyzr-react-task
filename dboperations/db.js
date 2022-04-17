const sqlite3 = require("sqlite3");
const Promise = require("bluebird");
var Singleton = (function () {
  var instance;
  function createTable(db) {
    const user_keyword = `CREATE TABLE IF NOT EXISTS user_keyword (email TEXT,name TEXT,keyword TEXT)`;

    db.run(user_keyword, (err) => {
      if (err) {
        console.log("TAble creation falied" + e);
      } else {
        console.log("Table Creted");
      }
    });
  }
  function createInstance() {
    var object = new sqlite3.Database(
      "./sqlite.db",
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          console.log("Could not connect to database", err);
        } else {
          console.log("Connected to database");
          createTable(object);
        }
      }
    );
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();



function addUser(name, email, profileUrl) {
  try {
    Singleton.getInstance().run("INSERT INTO user VALUES (?,?,?)", [
      email,
      name,
      profileUrl,
    ]);
    return "User Added Successfully";
  } catch (e) {
    console.log(e);
    return "User Not added : " + e;
  }
}
function insertUserKeyword(email, name, keyword) {
  try {
    var db = Singleton.getInstance();

    db.run(
      "INSERT INTO user_keyword VALUES (?,?,?)",
      [email, name, keyword],
      (err, result) => {
        if (err) {
          console.log("Error : " + err);
        } else {
          console.log("Insert in user_keyword ");
        }
      }
    );

    return "Keyword Added";
  } catch (e) {
    console.log("Keyword Not added" + e);
    return "Keyword Not added : " + e;
  }
}


const select = function (cb) {
  var lista = [];
  var db = Singleton.getInstance();
  db.all(
    "SELECT email,name,keyword,count(keyword) as count  FROM user_keyword group by email,keyword",
    function (err, rows) {
      if (err) return cb(err);
      let contador = 0;
      rows.forEach(function (row) {
        lista.push({
          email: row.email,
          name: row.name,
          keyword: row.keyword,
          count: row.count,
        });
      });

      return cb(lista);
    }
  );
};
module.exports = { insertUserKeyword,select };
