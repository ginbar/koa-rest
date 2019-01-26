'use strict';

const MODE = process.argv[2] || 'development';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const cors = require('@koa/cors');

const router = require('./routes');
const db = require('./db');
const logger = require('./logger');
const config = require('../../config')[MODE];


const app = new Koa();

app.use(compress())
    .use(cors())
    .use(db())
    .use(bodyParser())
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(config.port, () =>
    console.log(`Listening to port ${config.port}\n`));