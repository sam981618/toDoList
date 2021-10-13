const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

let items = [];
let workItems = [];

app.set('view engine', 'ejs');

app.get("/", function(req, res){

  let today = new Date();
  let day = "";

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  day = today.toLocaleDateString("es-ES", options)

  res.render("list", {listTitle: day, newListItems: items});
});



app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work list", newListItems: workItems});
});

app.post("/", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("app runs on port 3000");
})
