// var ServUrl=(function () {
//     var URL="";
//     var fn={};
//     fn.getURL=function () {
//         return URL;
//     };
//     return fn;
// })();
var glconfig=angular.module('globalconfig',[]);
glconfig.config(function ($httpProvider) {
    var currUserStr=window.sessionStorage.getItem("currUser");
    if(currUserStr===null){
    } else {
        var currUser=JSON.parse(currUserStr);
        $httpProvider.defaults.headers.common = { 'Current-UserId' : currUser.id }
    }
});