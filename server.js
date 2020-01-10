let express = require("express");
let app = express();
let reloadMagic = require("./reload-magic.js");
let multer = require("multer"); ///handles http requests from form submissions. It places data in the body property of the request object
let upload = multer({ dest: __dirname + "/uploads/" }); // we will be uploading images, signing up and logging in
let cookieParser = require("cookie-parser");
app.use(cookieParser());
let passwords = {};
let sessions = {};
let MongoClient = require("mongodb").MongoClient; //used to initiate connection
ObjectID = require("mongodb").ObjectID; //convert string to objectID

reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/uploads", express.static("uploads")); // Needed for local assets
let dbo = undefined;
let url =
  "mongodb+srv://jeff:pwd123@cluster0-uckdj.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    dbo = db.db("media-board2");
  }
);
// Your endpoints go after this line

//Sessions Id Generator
let generateId = () => {
  return "" + Math.floor(Math.random() * 100000000);
};

//searchResults endpoint
app.post("/searchResults", (req, res) => {
  console.log("request to /searchResults");
  console.log("queryString", req.query);
  dbo
    .collection("recipes")
    .find({ lowercasetitle: { $regex: req.query.lowercasetitle } })
    .toArray((err, recipes) => {
      if (err) {
        console.log("error", err);
        res.send("fail");
        return;
      }
      console.log("/searchResults array of recipes", recipes);
      res.json(recipes);
    });
});

//deleteSingleMsg endpoint
app.post("/deleteSingleMsg", upload.none(), (req, res) => {
  console.log("inside /deleteSingleMsg");
  let _id = req.query._id;
  console.log("req query", _id);
  dbo.collection("messages").remove({ _id: ObjectID(_id) }, err => {
    if (err) {
      console.log("/deleteSingleMsg fail");
      res.send(JSON.stringify({ success: false }));
    }
    console.log("Msg deletion success!!");
    res.send(JSON.stringify({ success: true }));
  });
});

//Messages endpoint
app.post("/messages", function(req, res) {
  console.log("inside /messages endpoint");
  let imgPath = req.query.imgPath;
  dbo
    .collection("messages")
    .find({ imgPath: imgPath })
    .toArray((err, messages) => {
      if (err) {
        console.log("error in messages", err);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      console.log("res.sending messages for id:", imgPath);
      console.log("messages", messages);
      res.send(JSON.stringify(messages));
    });
});

//deleteAll Endpoint
app.post("/deleteAll", upload.none(), (req, res) => {
  console.log("inside /deleteAll");
  dbo.collection("products").deleteMany({});
  res.json({ success: true });
});

//add newMessages endpoint
app.post("/newMessage", upload.none(), (req, res) => {
  let username = req.body.username;
  let message = req.body.msg;
  let imgPath = req.body.imgPath;
  let timeStamp = req.body.timeStamp;
  console.log(
    "inside /newMessage endpoint msg:" + message + " name" + username
  );
  dbo.collection("messages").insertOne(
    {
      message: message,
      username: username,
      imgPath: imgPath,
      timeStamp: timeStamp
    },
    (err, messageObject) => {
      if (err) {
        console.log("/newMessage failed :(");
        res.send(JSON.stringify({ success: false }));
        return;
      }
      console.log("/newMessage success!!");
      res.send(JSON.stringify({ success: true }));
    }
  );
});

//login endpoint
app.post("/login", upload.none(), (req, res) => {
  console.log("login", req.body);
  let name = req.body.username;
  let enteredPassword = req.body.password;
  dbo.collection("users").findOne({ username: name }, (err, user) => {
    if (err || user === null || user.password !== enteredPassword) {
      console.log("/login error", err);
      res.send(JSON.stringify({ success: false }));
      return;
    }
    let sessionId = req.cookies.sessionId;
    dbo.collection("user").findOne({ sessionId: sessionId }, (err, session) => {
      if (session === null) {
        let sessionId = generateId();
        console.log("session", sessionId);
        dbo
          .collection("sessions")
          .insertOne(
            { username: name, sessionId: sessionId },
            (error, insertedSession) => {
              res.cookie("sessionId", sessionId);
              res.send(JSON.stringify({ success: true, sessionId: sessionId }));
            }
          );
      }
    });
    return;
  });
});

//signup endpoint
app.post("/signup", upload.none(), (req, res) => {
  console.log("signup", req.body); //body is the data from signup from post component
  let name = req.body.username;
  let pwd = req.body.password;

  //checks to see if the username exists in the database
  dbo.collection("users").findOne({ username: name }, (err, user) => {
    if (err || user !== null) {
      console.log("/login error", err);
      res.send(JSON.stringify({ success: false }));
      return;
    }
    console.log(name + " is available!");

    //creates a new username and sessionId
    dbo
      .collection("users")
      .insertOne({ username: name, password: pwd }, (error, insertedUser) => {
        let sessionId = generateId();
        console.log("generated id", sessionId);

        dbo
          .collection("sessions")
          .insertOne(
            { username: name, sessionId: sessionId },
            (error, insertedSession) => {
              res.cookie("sessionId", sessionId);
              res.send(JSON.stringify({ success: true, sessionId: sessionId }));
            }
          );
      });
    return;
  });
});

//check-login endpoint
app.post("/check-login", upload.none(), (req, res) => {
  let sessionId = req.cookies.sessionId; //req.cookies.sessionId is obtained automatically (how?)
  console.log("session id", sessionId);
  dbo.collection("sessions").findOne({ sessionId: sessionId }, (err, user) => {
    //'user' would be the whole object
    if (err || user === null) {
      console.log(
        "/check-login failed, session probably does not exist anymore"
      );
      res.send(JSON.stringify({ success: false }));
      return;
    }
    console.log("the name", user.username);
    let username = user.username;
    if (username !== undefined) {
      res.send(
        JSON.stringify({
          success: true,
          username: username,
          sessionId: sessionId
        })
      );
      return;
    }
    res.send(JSON.stringify({ success: false }));
  });
});

//check-admins endpoint
app.post("/check-admins", upload.none(), (req, res) => {
  console.log("request to /check-admins");
  dbo
    .collection("admins")
    .find({})
    .toArray((err, admins) => {
      if (err) {
        console.log("error", err);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      console.log("success! sending admins", admins);
      res.send(JSON.stringify({ success: true, admins }));
    });
});

//deleteSessionId endpoint
app.post("/deleteSessionId", upload.none(), (req, res) => {
  console.log("inside /deleteSessionId");
  let sessionId = req.query.sessionId;
  console.log("req query", sessionId);
  dbo.collection("sessions").remove({ sessionId: sessionId }, err => {
    if (err) {
      console.log("/deleteSessionId fail");
      res.send(JSON.stringify({ success: false }));
    }
    res.send(JSON.stringify({ success: true }));
  });
});

//deleteSingle endpoint
app.post("/deleteSingle", upload.none(), (req, res) => {
  console.log("inside /deleteSingle", req.query);
  let imgPath = req.query.imgPath;
  console.log("req query", imgPath);
  dbo.collection("recipes").remove({ imgPath: imgPath }, err => {
    if (err) {
      console.log("/deleteSingle fail");
      res.send(JSON.stringify({ success: false }));
    }
    res.send(JSON.stringify({ success: true }));
  });
});

//deleteSingleFavorite endpoint
app.post("/deleteSingleFavorite", upload.none(), (req, res) => {
  console.log("inside /deleteSingleFavorite", req.query);
  let imgPath = req.query.imgPath;
  console.log("req query", imgPath);
  dbo.collection("favorites").remove({ imgPath: imgPath }, err => {
    if (err) {
      console.log("/deleteSingleFavorite fail");
      res.send(JSON.stringify({ success: false }));
    }
    console.log("delete single favorite success!");
    res.send(JSON.stringify({ success: true }));
  });
});

//recipes endpoint
app.post("/recipes", upload.none(), (req, res) => {
  console.log("request to /recipes");
  // let name = req.query.username;
  // console.log("query username:", name);
  console.log("req query!", req.query);
  dbo
    .collection("recipes")
    .find(req.query) //sort by everything the seller is selling. later on we will sort his wishlist and purchases
    // .find({})
    .toArray((err, recipes) => {
      if (err) {
        console.log("error", err);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      console.log("array of recipe detail object", recipes);
      res.send(JSON.stringify(recipes));
    });
});

//promorecipe endpoint
app.post("/promorecipe", upload.none(), (req, res) => {
  console.log("request to /promorecipe");
  // let name = req.query.username;
  // console.log("query username:", name);
  console.log("req query!", req.query);
  dbo
    .collection("promorecipe")
    .find(req.query) //sort by everything the seller is selling. later on we will sort his wishlist and purchases
    // .find({})
    .toArray((err, promorecipe) => {
      if (err) {
        console.log("error", err);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      console.log("array of recipe detail object", promorecipe);
      res.send(JSON.stringify(promorecipe));
    });
});

//Favoriterecipes endpoint
app.post("/favoriterecipes", upload.none(), (req, res) => {
  console.log("request to /favoriterecipe");
  // let name = req.query.username;
  // console.log("query username:", name);
  console.log("req query!", req.query);
  dbo
    .collection("favorites")
    .find(req.query) //sort by everything the seller is selling. later on we will sort his wishlist and purchases
    // .find({})
    .toArray((err, recipes) => {
      if (err) {
        console.log("error", err);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      console.log("favorite detail object", recipes);
      res.send(JSON.stringify(recipes));
    });
});

//createRecipe endpoint
app.post("/createRecipe", upload.single("file"), (req, res) => {
  console.log("request to /createRecipe. body: ", req.body);
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let recipetitle = req.body.recipetitle;
  let lowercasetitle = req.body.lowercasetitle;
  let numberofservings = req.body.numberofservings;
  let ingredients = req.body.ingredients;
  let directions = req.body.directions;
  let uploader = req.body.uploader;
  let file = req.file; // the image file
  let frontendPath = "/uploads/" + file.filename; //what is filename?
  dbo.collection(req.query.collection).insertOne({
    firstname: firstname,
    lastname: lastname,
    recipetitle: recipetitle,
    lowercasetitle: lowercasetitle,
    numberofservings: numberofservings,
    ingredients: ingredients,
    directions: directions,
    uploader: uploader,
    imgPath: frontendPath
  });
  res.send(JSON.stringify({ success: true }));
});

//createFavoriteRecipe
app.post("/createFavoriteRecipe", upload.none(), (req, res) => {
  console.log("request to /createFavoriteRecipe. body: ", req.body);
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let recipetitle = req.body.recipetitle;
  let lowercasetitle = req.body.lowercasetitle;
  let numberofservings = req.body.numberofservings;
  let ingredients = req.body.ingredients;
  let directions = req.body.directions;
  let imgPath = req.body.imgPath;
  let favoritedby = req.body.favoritedby;
  let oldId = req.body.oldId;
  dbo.collection(req.query.collection).insertOne({
    firstname: firstname,
    lastname: lastname,
    recipetitle: recipetitle,
    lowercasetitle: lowercasetitle,
    numberofservings: numberofservings,
    ingredients: ingredients,
    directions: directions,
    favoritedby: favoritedby,
    imgPath: imgPath,
    oldId: oldId
  });
  res.send(JSON.stringify({ success: true }));
});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
