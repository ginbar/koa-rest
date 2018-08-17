'use strict';

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


module.exports.find = function (collection, criteria) {
    if(Number.isFinite(criteria)) {
        return data[collection][criteria];
    } else {
        let filters = Object.entries(criteria);
        return data[collection].filter(elem => 
            filters.every(([field, value]) => elem[field] === value));
    }
};

module.exports.save = function (collection, object) {
    data[collection].push(object);
};

module.exports.delete = function (collection, criteria) {
    module.exports.find(criteria)
        .map(elem => data[collection].indexOf(elem))
        .filter(index => index >= 0)
        .forEach(index => data[collection].splice(index, 1));
};