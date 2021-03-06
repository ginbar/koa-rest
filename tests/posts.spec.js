const frisby = require('frisby');
const Joi = frisby.Joi;
const config = require('../config')['development'];

const url = `http://localhost:${config.port}`;



describe('posts', function () {

    it('allowed methods should be options, get, post, patch, put and delete', function (done) {
        return frisby
            .fetch(`${url}/posts`, { method: 'OPTIONS' })
            .expect('status', 200)
            .inspectHeaders()
            .expect('header', 'Allow', 'OPTIONS,GET,POST,PATCH,PUT,DELETE')
            .done(done);
    });



    it('should return all posts with id, title and user', function (done) {
        return frisby
            .get(`${url}/posts`)
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                title: Joi.string(),
                user: Joi.string()
            })
            .done(done);
    });



    it('request with id should return a post', function (done) {
        const id = '0fa616b7-3952-4e8a-85e2-88edd757f1e4';
        return frisby
            .get(`${url}/posts/${id}`)
            .expect('status', 200)
            .expect('json', {
                "user": "bob",
                "title": "Another post by Bob",
                "id": id
            })
            .done(done);
    });



    it('post response should contains location header', function (done) {
        return frisby
            .post(`${url}/posts`, {
                user: 'user',
                title: 'title'
            })
            .expect('status', 201)
            .expect('header', 'Location')
            .done(done);
    });



    it('patch response status should be 200', function (done) {
        const id = '0fa616b7-3952-4e8a-85e2-88edd757f1e4';
        return frisby
            .fetch(`${url}/posts/${id}`, { method: 'PATCH' })
            .expect('status', 200)
            .done(done);
    });


    
    it('delete response status should be 200', function (done) {
        return frisby
            .post(`${url}/posts`, { user: 'user', title: 'title' })
            .then(res => frisby.delete(`${url}${res.headers.get('location')}`))
            .expect('status', 200)
            .done(done);
    });

});