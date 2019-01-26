'use strict';

const MODE = process.argv[2] || 'development';

const dblow = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const id = require('lodash-id');
const config = require('../../config')[MODE];



module.exports = function (ctx, next) {

    const db = dblow(new FileAsync(config.dbjson, {
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