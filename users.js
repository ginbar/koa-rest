'use strict';

const db = require('./db');


module.exports.all = function (ctx) {
    ctx.response.body = db.find('users', {});
};


module.exports.posts = function (ctx) {
    ctx.response.body =  db
        .find('posts', { user: ctx.params.name })
        .map(post => ({ title: post.title }));    
};