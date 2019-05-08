const http = require('http');
const url = require('url');
const server =http.createServer();
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'node',
    password: 'websystem',
    database: 'web'
});

server.on( 'request', function(req,res) {
    
    connection.connect( function(error) {
        if( error) {
            console.log('Connection Error');
            return;
        }
    });
    
    let url_parse = url.parse(req.url,true);
    res.writeHead( 200, {'Content-Type' : 'text/html' });
    res.write('<!DOCTYPE html>');
    res.write('<html lang=ja>');
    res.write('<head><meta charset="UTF-8"></head>');
    res.write('<body>');
    res.write('<h1>Hello world</h1>');
    connection.query('select id, 都道府県, 人口 from example order by 人口 desc limit 10;', function(error, rows, fields) {
        if( error ) {
            console.log('Query Error');
        }

        for( let i=0; i<rows.length; i++ ) {
            console.log( "id=" + rows[i].id );
            console.log( "都道府県=" + rows[i]['都道府県'] );
            console.log( "人口=" + rows[i]['人口'] );
        }
    });
    connection.end();
    console.log(url_parse);
    res.write('</body>');
    res.write('</html>');
    res.end();
});

server.listen(80);
