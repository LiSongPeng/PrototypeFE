
// To avoid the EXDEV rename error, see http://stackoverflow.com/q/21071303/76173
process.env.TMPDIR ='tmp' ;
//process.env ['NODE_TLS_REJECT_UNAUTHORIZED'] ='0' ; // Ignore 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' authorization error

var app = require ('./server') ;

var server =app.listen (app.get ('port'), function () {
    console.log ('http://localhost:' + server.address ().port) ;
}) ;

server.on ('error', function (err) {
    if ( err.errno == 'EACCES' ) {
        console.log ('Port already in use.\nExiting...') ;
        process.exit (1) ;
    }
}) ;
