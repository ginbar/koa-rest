'use strict';

module.exports = () => async function (ctx, next) {
    
    const {method, path} = ctx.request;
    const date = new Date(); 
    
    console.log(`${method} ${path} ${date.toISOString()}`);
    
    await next();
};