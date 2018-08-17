'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const config = require('../config.json');
const router = require('./routes');

const app = new Koa();

app.use(bodyParser());

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.path}`);
    await next(); 
});

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(config.port, () => 
    console.log(`Listening to port ${config.port}`));