'use strict';

const db = require('../api/db');


module.exports.all = async function (ctx) {
    ctx.response.body = await ctx.db.get('users')
        .select('name')
        .value();
};


module.exports.posts = async function (ctx) {
    ctx.response.body = await ctx.db.get('users')
        .filter({ user: ctx.params.name })
        .select('id', 'title')
        .value();
};