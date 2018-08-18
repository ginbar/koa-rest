'use strict';

const Router = require('koa-router');

const posts = require('../controllers/posts');
const users = require('../controllers/users');
const comments = require('../controllers/comments');

const router = new Router();

// users
router.get('/users/:name/posts', users.posts);
router.get('/users/:name', users.fetch);
router.get('/users', users.list);

// posts
router.get('/posts', posts.list);
router.get('/posts/:id', posts.fetch);
router.get('/posts/:id/comments', posts.fetch);
router.put('/posts', posts.add);
router.post('/posts/:id', posts.modify)
router.delete('/posts/:id', posts.remove);

//comments
router.get('/comments', comments.list);
router.get('/comments/:id', comments.fetch);

module.exports = router;