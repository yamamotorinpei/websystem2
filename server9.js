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

server.get('/players', function( req, res ) {

    let query = "select * from player;";
    console.log( query );
    connection.query( query, (error, rows, fields) => {
        if( error ) {
            console.log('Query Error');
        }
        res.render( 'players.ejs', { content: rows });
    });
});
   /* 
    server.get('/taem', function( req, res ) {
    let name= req.query.person || '';
    if(name.length !=0){
    let query = "insert into taem (name) values ('"+name+"');"
    console.log( query );
    connection.query( query, (error, rows, fields) => {
        if( error ) {
            console.log('Query Error');
        }
        res.render( 'players.ejs', { content: rows });
    });
    };
        
        server.get('/batting', function( req, res ) {
    let name= req.query.number || '';
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
*/


server.listen( 80, function() {
    console.log( 'listening on port 80' );
});

