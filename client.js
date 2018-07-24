'use strict';

const http = require('http');
const config = require('./config.json');


request('get', '/posts');
request('get', '/users/bob/posts');

function request(method, path, data) {
    let req = http.request({
        host: `localhost`,
        path: path,
        port: config.port,
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    }, resp => {
        let builder = [];
        resp.on('data', chuck => builder.push(chuck))
            .on('end', () => {
                console.log(`${path} -> ${resp.statusCode}`);     
                console.log(builder.join());
                console.log('---------------------------------');
            })
            .on('error', console.error);
    });
    if(data) 
        req.write(JSON.stringify(data));
    req.end();
}
