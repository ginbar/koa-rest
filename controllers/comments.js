'use strict';


module.exports.options = async function (ctx) {
    ctx.set('Allow', ['OPTIONS', 'GET', 'POST']);
    ctx.response.status = 200;
}


module.exports.list = async function (ctx) {
    ctx.response.body = await ctx.db.get('comments')
        .select('user', 'post')
        .value();
}


module.exports.fetch = async function (ctx) {
    ctx.response.body = await ctx.db.get('comments')
        .getById(ctx.params.id)
        .value();
}


module.exports.add = async function (ctx) {
    ctx.response.body.post = ctx.params.id;
    const { id } = await ctx.db.get('comments')
        .upsert(ctx.response.body)
        .write();
    ctx.set('Location', `/comments/${id}`);
    ctx.response.status = 201;
}


module.exports.byPost = async function (ctx) {
    ctx.response.body = await ctx.db.get('comments')
        .find({ post: ctx.params.id })
        .select('title', 'user')
        .value();
}