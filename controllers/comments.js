'use strict';


module.exports.list = async function (ctx) {
    ctx.response.body = await ctx.db.get('comments')
        .select('user', 'post')
        .value();
};


module.exports.fetch = async function (ctx) {
    ctx.response.body = await ctx.db.get('comments')
        .getById(ctx.params.id)
        .value();
};


module.exports.add = async function (ctx) {
    ctx.response.body.post = ctx.params.id;
    await ctx.db.get('comments').upsert(ctx.response.body);
};


module.exports.comments = async function (ctx) {
    ctx.response.body = await ctx.db.get('comments')
        .find({ post: ctx.params.id });
};