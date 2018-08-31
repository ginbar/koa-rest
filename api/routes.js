'use strict';

const Router = require('koa-router');

const posts = require('../controllers/posts');
const users = require('../controllers/users');
const comments = require('../controllers/comments');

const router = new Router();

// users
router.get('/users', users.list);
router.get('/users/:name', users.fetch);
router.get('/users/:name/posts', users.posts);

// posts
router.get('/posts', posts.list);
router.put('/posts', posts.add);
router.get('/posts/:id', posts.fetch);
router.post('/posts/:id', posts.modify)
router.delete('/posts/:id', posts.remove);

//comments
router.get('/comments', comments.list);
router.get('/comments/:id', comments.fetch);
router.put('/posts/:id/comments', comments.add);
router.get('/posts/:id/comments', posts.comments);

module.exports = router;