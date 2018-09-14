const frisby = require('frisby');
const Joi = frisby.Joi;
const config = require('../config.json');

const url = `http://localhost:${config.port}`;

describe('comments', function () {

    it('allowed methods should be options, get and post', function (done) {
        return frisby
            .fetch(`${url}/comments`, { method: 'OPTIONS' })
            .expect('status', 200)
            .expect('header', 'Allow', 'OPTIONS,GET,POST')
            .inspectHeaders()
            .done(done);
    });


    // it('should return all comments with', function (done) {
    //     return frisby
    //         .get(`${url}/comments`)
    //         .expect('status', 200)
    //         .expect('jsonTypes', '*', {
    //             // id: Joi.string(),
    //             user: Joi.string(),
    //             post: Joi.string()
    //         })
    //         .done(done);
    // });

});
