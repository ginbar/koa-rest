const frisby = require('frisby');
const Joi = frisby.Joi;
const config = require('../config')['development'];

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



    it('should return all comments with user and post', function (done) {
        return frisby
            .get(`${url}/comments`)
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                user: Joi.string(),
                post: Joi.string()
            })
            .done(done);
    });



    it('should return a comment with user, post and text', function (done) {
        return frisby
            .get(`${url}/comments/2`)
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                user: Joi.string(),
                post: Joi.string(),
                text: Joi.string()
            })
            .done(done);
    });



    it('should return all comments posts', function (done) {
        return frisby
            .get(`${url}/posts/1/comments`)
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                user: Joi.string(),
                post: Joi.string(),
                text: Joi.string()
            })
            .done(done);
    });



    it('should add a comment to a post', function (done) {
        return frisby
            .post(`${url}/posts/1/comments`, {
                user: 'bob',
                post: 'la la la',
                text: 'Some text.'
            })
            .expect('status', 201)
            .expect('header', 'Location')
            .done(done);
    });

});
