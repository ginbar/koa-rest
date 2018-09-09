'use strict';

const Router = require('koa-router');

const posts = require('../controllers/posts');
const users = require('../controllers/users');
const comments = require('../controllers/comments');

const router = new Router();

// users
router
    .options('/users', users.options)
    .get('/users', users.list)
    // TODO Allow options to every url?
    // .options('/users/:name', )  
    .get('/users/:name', users.fetch)
    .get('/users/:name/posts', users.posts);

// posts
router
    .options('/posts', posts.options)
    .get('/posts', posts.list)
    .post('/posts', posts.add)
    .get('/posts/:id', posts.fetch)
    // .put('/posts:id', posts.replace) // Does it make any sense?
    .patch('/posts/:id', posts.modify)
    .delete('/posts/:id', posts.remove);

// comments
router
    .get('/comments', comments.list)
    .options('/comments', comments.options)
    .get('/comments/:id', comments.fetch)
    .post('/posts/:id/comments', comments.add)
    .get('/posts/:id/comments', comments.byPost);

module.exports = router;