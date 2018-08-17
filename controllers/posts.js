'use strict';

const db = require('../api/db');


module.exports.all = function (ctx) {
    ctx.response.body = db.find('posts', {})
        .map(post => ({user: post.user, title: post.title}));
};


module.exports.fetch = function (ctx) {
    ctx.response.body = db.find('posts', ctx.params.id);
};


module.exports.add = function (ctx) {
    db.save('posts', ctx.request.body);
    ctx.response.status = 200;
}


module.exports.modify = function (ctx) {
    let post = db.find('posts', {id: ctx.params.id});
    if(!post) {
        ctx.response.status = 404;
    } else {
        let updates = Object.entries(ctx.request.body);  
        for (const [field, value] of updates)
            post[field] = value;
        ctx.response.status = 200;
    }
};


module.exports.remove = function (ctx) {
    db.remove('posts', { id: ctx.params.id });
    ctx.response.status = 200;
};