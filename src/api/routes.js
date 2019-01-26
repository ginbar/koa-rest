'use strict';

const Router = require('koa-router');

const posts = require('../controllers/posts');
const users = require('../controllers/users');
const comments = require('../controllers/comments');


const router = new Router();

router

    // users
    .options('/users', users.options)
    .get('/users', users.list)
    .get('/users/:name', users.fetch)
    .get('/users/:name/posts', users.posts)

    // posts
    .options('/posts', posts.options)
    .get('/posts', posts.list)
    .post('/posts', posts.add)
    .get('/posts/:id', posts.fetch)
    .patch('/posts/:id', posts.modify)
    .delete('/posts/:id', posts.remove)

    // comments
    .options('/comments', comments.options)
    .get('/comments', comments.list)
    .get('/comments/:id', comments.fetch)
    .post('/posts/:id/comments', comments.add)
    .get('/posts/:id/comments', comments.byPost);

module.exports = router;