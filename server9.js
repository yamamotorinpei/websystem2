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

server.get('/player/', function( req, res ) {
    let query = 'select batting.id,batting.year,batting.HR,player.name'+'form batting inner join player on batting.player_id=player.id limit 10';';
    console.log( query );
    connection.query( query, (error, rows, fields) => {
        if( error ) {
            console.log('Query Error');
        }
        res.render( 'players.ejs', { content: rows });
    });
});



server.listen( 80, function() {
    console.log( 'listening on port 80' );
});

