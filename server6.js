const express = require('express');
const server = express();

server.get('/', function( req, res ) {
    res.send( 'Hello, world' );
});

server.listen( 80, function() {
    console.log( 'listening on port 80' );
});

