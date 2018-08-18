'use strict';


module.exports.list = async function (ctx) {
    ctx.response.body = await ctx.db.get('users')
        .select('name')
        .value();
};


module.exports.fetch = function (ctx) {
    ctx.response.body = await ctx.db.get('users')
        .find({ name: ctx.params.name })
        .value();
};


module.exports.posts = async function (ctx) {
    ctx.response.body = await ctx.db.get('users')
        .filter({ user: ctx.params.name })
        .select('id', 'title')
        .value();
};