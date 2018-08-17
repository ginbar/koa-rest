'use strict';


module.exports.all = async function (ctx) {
    ctx.response.body = await ctx.db.get('posts')
        .select('title', 'user')
        .value();
};


module.exports.fetch = function (ctx) {
};


module.exports.add = function (ctx) {
}


module.exports.modify = function (ctx) {
    
};


module.exports.remove = function (ctx) {
};