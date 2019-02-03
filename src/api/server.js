'use strict';

const MODE = process.argv[2] || 'development';
const config = require('../../config')[MODE];

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const cors = require('@koa/cors');

const router = require('./routes');
const db = require('./db');
const logger = require('./logger');



const app = new Koa();

app.use(compress())
    .use(cors())
    .use(bodyParser())
    .use(logger())
    .use(db(config.dbjson))
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(config.port, () =>
    console.log(`Listening to port ${config.port}\n`));