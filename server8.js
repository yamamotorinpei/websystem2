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

server.get('/', function( req, res ) {
    let sorting = req.query.sorting || '人口';
    let number = req.query.number || 10;
    let query = 'select id, 都道府県,'+ sorting + ' as population from example order by ' + sorting + ' desc limit ' + number + ';';
    console.log( query );
    connection.query( query, (error, rows, fields) => {
        if( error ) {
            console.log('Query Error');
        }
        res.render( 'sql2.ejs', { content: rows });
    });
});
server.get('/web', function( req, res) {
    let sorting = req.query.sorting || '学生数';
    let number = req.query.number || 5;
    let query = 'select id, 都道府県'
});
server.listen( 80, function() {
    console.log( 'listening on port 80' );
});

