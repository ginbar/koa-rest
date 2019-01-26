'use strict';


module.exports.options = async function (ctx) {
    ctx.set('Allow', ['OPTIONS', 'GET']);
    ctx.response.status = 200;
}


module.exports.list = async function (ctx) {
    ctx.response.body = await ctx.db.get('users')
        .select('name')
        .value();
}


module.exports.fetch = async function (ctx) {
    ctx.response.body = await ctx.db.get('users')
        .find({ name: ctx.params.name })
        .value();
}


module.exports.posts = async function (ctx) {
    ctx.response.body = await ctx.db.get('posts')
        .filter({ user: ctx.params.name })
        .select('id', 'title')
        .value();
}