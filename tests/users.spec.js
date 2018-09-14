const frisby = require('frisby');
const Joi = frisby.Joi;
const config = require('../config.json');

const url = `http://localhost:${config.port}`;

describe('users', function () {

    it('allowed methods should do be options and get', function (done) {
        return frisby
            .fetch(`${url}/users`, { method: 'OPTIONS' })
            .expect('status', 200)
            .expect('header', 'Allow', 'OPTIONS,GET')
            .done(done);
    });


    it('should return all users with name', function (done) {
        return frisby
            .get(`${url}/users`)
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                name: Joi.string()
            })
            .done(done);
    });


    it('get with name should return an user', function (done) {
        const name = 'todd';
        return frisby
            .get(`${url}/users/${name}`)
            .expect('status', 200)
            .expect('json', {
                name: name,
                email: `${name}@mail.com`
            })
            .done(done);
    });


    it('should return all posts by an user', function (done) {
        const name = 'bob';
        return frisby
            .get(`${url}/users/${name}/posts`)
            .expect('status', 200)
            .expect('jsonTypes', '*', {
                title: Joi.string(),
                user: Joi.string()
            })
            .done(done);
    });

});