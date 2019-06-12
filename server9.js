const express = require('express');
const server = express();
const ejs = require('ejs');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'node',
    password: 'websystem',
    database: 'web'
});

server.get('/players_create', function( req, res ) {
    let name= req.query.number || ";
    if(name.length !=0){
    let query = "insert into players (name) values ('"+name+"');"
    console.log( query );
    connection.query( query, (error, rows, fields) => {
        if( error ) {
            console.log('Query Error');
        }
        res.render( 'players.ejs', { content: rows });
    });
    };
});



server.listen( 80, function() {
    console.log( 'listening on port 80' );
});

