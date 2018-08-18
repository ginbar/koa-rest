'use strict';


module.exports.all = async function (ctx) {
    ctx.response.body = await ctx.db.get('posts')
        .select('id', 'title', 'user')
        .value();
};


module.exports.fetch = async function (ctx) {
    ctx.response.body = await ctx.db.get('posts')
        .getById(ctx.params.id)
        .value();
};


module.exports.add = async function (ctx) {
    ctx.response.body = await ctx.db.get('posts')
        .upsert(ctx.request.body)
        .write()
        .id;
};


module.exports.modify = async function (ctx) {
    await ctx.db.get('posts')
        .updateById(ctx.params.id, ctx.request.body)
        .write();
    ctx.response.status = 200;
};


module.exports.remove = async function (ctx) {
    await ctx.db.get('posts')
        .removeById(ctx.params.id)
        .write();
    ctx.response.status = 200;
};