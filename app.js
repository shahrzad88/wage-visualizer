// Dependencies
// =============================================================
const express = require('express');

// Sets up the Express App
// =============================================================
const app = express();
const path = require('path');
const router = express.Router();
let PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory to be served
app.use(express.static("app/public"));

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

router.get('/',function(req,res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});
