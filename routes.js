'use strict';

const Router = require('koa-router');

const posts = require('./posts');
const users = require('./users');

const router = new Router();

// posts
router.get('/posts', posts.all);
router.get('/posts/:id', posts.fetch);
router.get('/posts/:id/comments', posts.fetch);
router.put('/posts', posts.add);
router.post('/posts/:id', posts.modify)
router.delete('/posts/:id', posts.remove);

// users
router.get('/users/:name/posts', users.posts);
router.get('/users', users.all);

module.exports = router;