'use strict';


module.exports.options = async function (ctx) {
    ctx.set('Allow', ['OPTIONS', 'GET', 'POST', 'PATCH', 'PUT', 'DELETE']);
    ctx.response.status = 200;
}



module.exports.list = async function (ctx) {
    let query = ctx.db.get('posts')
        .select('id', 'title', 'user');

    const { sort, latest } = ctx.request.query;
    
    if (sort)
        query = query.orderBy([sort]);

    if (latest)
        query = query.takeRight(Number.parseInt(latest));

    ctx.response.body = await query.value();
}



module.exports.fetch = async function (ctx) {
    ctx.response.body = await ctx.db.get('posts')
        .getById(ctx.params.id)
        .value();
}



module.exports.add = async function (ctx) {
    const { id } = await ctx.db.get('posts')
        .upsert(ctx.request.body)
        .write();
    ctx.set('Location', `/posts/${id}`);
    ctx.response.status = 201;
}



module.exports.modify = async function (ctx) {
    await ctx.db.get('posts')
        .updateById(ctx.params.id, ctx.request.body)
        .write();
    ctx.response.status = 200;
}



module.exports.replace = async function (ctx) {
    await ctx.db.get('posts')
        .replaceById(ctx.params.id, ctx.request.body)
        .write();
    ctx.response.status = 201;
}



module.exports.remove = async function (ctx) {
    await ctx.db.get('posts')
        .removeById(ctx.params.id)
        .write();
    ctx.response.status = 200;
}