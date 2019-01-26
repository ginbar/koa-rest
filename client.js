'use strict';

const http = require('http');
const { development: config } = require('./config');


request('get', '/posts');
request('get', '/users/bob/posts');
request('get', '/posts/3');
// request('put', '/posts', { user: 'bob', title: 'Another post by Bob' });
request('get', '/comments?sort=date&latest=2');

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
                console.log(`${method.toUpperCase()} ${path} -> ${resp.statusCode}`);
                console.log(builder.join());
                console.log('---------------------------------');
            })
            .on('error', console.error);
    });
    if (data)
        req.write(JSON.stringify(data));
    req.end();
}
