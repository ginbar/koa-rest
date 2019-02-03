'use strict';

const dblow = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const id = require('lodash-id');



module.exports = function (path) {

    const db = dblow(new FileAsync(path, {
        defaultValue: { posts: [], users: [], comments: [] }
    }));
    
    db.then(db => db._
        .mixin(id)
        .mixin({
            select(array, ...properties) {
                return array.map(elem => {
                    const obj = {};
                    for (const prop of properties)
                        obj[prop] = elem[prop];
                    return obj;
                });
            }
        }));

    return async function (ctx, next) {
        ctx.db = await db;
        await next();
    };
};