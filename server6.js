const express = require('express');
const server = express();

server.get('/', function( req, res ) {
    res.send( 'Hello, world' );
});
server.get('/morning', function( req , res ) {
  res.send( 'Good morning, World' );
});
server.listen( 80, function() {
    console.log( 'listening on port 80' );
});

