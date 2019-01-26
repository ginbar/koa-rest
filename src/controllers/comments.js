'use strict';


module.exports.options = async function (ctx) {
    ctx.set('Allow', ['OPTIONS', 'GET', 'POST']);
    ctx.response.status = 200;
}



module.exports.list = async function (ctx) {
    let query = ctx.db.get('comments')
        .select('user', 'post', 'text', 'date');

    const { sort, latest } = ctx.request.query;

    if (sort)
        query = query.orderBy([sort]);

    if (latest)
        query = query.takeRight(Number.parseInt(latest));

    ctx.response.body = await query.value();
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
        .filter({ idPost: Number.parseInt(ctx.params.id) })
        .select('user', 'text', 'date', 'responses')
        .value();
}