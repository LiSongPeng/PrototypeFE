var express = require ('express') ;
var path = require('path');
var app = express() ;
// var router = require('./routes/index');

app.use(express.static (path.join(__dirname, 'public')));
app.set ('port', process.env.PORT || 14250) ;

app.use('/',function (req,res,next) {
    res.sendfile("./public/index.html");
});
app.use('/home',function (req,res,next) {
    res.sendfile("./public/home.html");
});
module.exports = app ;