const express = require('express');
const ejs = require('ejs');
const server = express();

server.set( 'ejs', ejs.renderFile );

server.get('/', function( req, res ) {
    res.render('index.ejs', {title: 'Express' });
});

server.listen( 80, () => {
    console.log( 'listening on port 80' );
})

