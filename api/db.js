'use strict';

const dblow = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const config = require('../config.json');

const adapter = new FileAsync(config.dbjson, {
    defaults: { posts: [], users: [] }
});

const db = dblow(adapter);

db.then(db => db._.mixin({
    select: function (array, ...properties) {
        return array.map(function(elem) {
            let obj = {}
            for (const prop of properties)
                obj[prop] = elem[prop];
            return obj;
        });
    }
}));

module.exports = db;

const data = {
    users: [
        {
            name: 'todd',
            email: 'todd@mail.com',
        },
        {
            name: 'kelly',
            email: 'kelly@mail.com'
        },
        {
            name: 'trace',
            email: 'trace@mail.com'
        },
        {
            name: 'bob',
            email: 'bob@mail.com'
        }
    ],
    posts: [
        {
            id: 1,
            user: 'kelly',
            title: 'A tl;dr post',
            text: 'A really long text.'
        },
        {
            id: 2,
            user: 'trace',
            title: 'Web services using Node.js',
            text: 'Some node stuff.',
            comments: [
                {
                    user: 'bob',
                    date: new Date(),
                    text: 'Thanks for the node stuff.'
                }
            ]
        },
        {
            id: 3,
            user: 'bob',
            title: 'Intro to Javascript',
            text: 'Some js basics.',
            comments: [
                {
                    user: 'trace',
                    date: new Date(),
                    text: 'Nice js intro.',
                    responses: [
                        {
                            user: 'bob',
                            text: 'Thanks.'
                        }
                    ]
                },
                {
                    user: 'todd',
                    date: new Date(Date.now() + 10000000),
                    text: 'Good job.'
                },
                {
                    user: 'trace',
                    date: new Date(Date.now() + 20000000),
                    text: 'Could you make an asm intro?'
                }
            ]
        },
        {
            id: 4,
            user: 'bob',
            title: 'Wasm for beginners',
            text: 'Some asm basics.',
        }
    ]
};
