var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();

mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));

title
image
body
created



