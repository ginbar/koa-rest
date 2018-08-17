'use strict';

const dblow = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const config = require('../config.json');

const adapter = new FileAsync(config.dbjson, {
    defaults: { posts: [], users: [] }
});

const db = dblow(adapter);

db.then(db => db._.mixin({
    select(array, ...properties) {
        return array.map(elem => {
            let obj = {};
            for (const prop of properties)
                obj[prop] = elem[prop];
            return obj;
        });
    }
}));

module.exports = db;