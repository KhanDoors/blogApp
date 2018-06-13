var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();

mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default:Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// 7 restful routes
app.get("/", function(req,res){
    res.redirect("/blogs");
});



//Index Route
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("error");
        }else{
            res.render("index", {blogs: blogs});
        }
    });    
});

//New Route
app.get("/blogs/new", function (req, res){
    res.render("new");
});
//Create Route
app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }else {
            res.redirect("/blogs");
        }
    });
   });

//Show Route
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show", {blog: foundBlog});
        }
    });
});





var PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log('server on port 3000');
});

