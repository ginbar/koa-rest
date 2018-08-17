'use strict';

const db = require('../api/db');


module.exports.all = function (ctx) {
    ctx.response.body = db.find('users', {});
};


module.exports.posts = async function (ctx) {
    ctx.response.body = await ctx.db.get('posts')
        .filter({ user: ctx.params.name })
        .select('title')
        .value();
};