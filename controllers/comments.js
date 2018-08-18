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