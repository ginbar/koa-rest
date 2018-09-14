const frisby = require('frisby');
const Joi = frisby.Joi;
const config = require('../config.json');

const url = `http://localhost:${config.port}`;

describe('comments', function () {

    

    it('should return all posts', function () {
        return frisby
            .get(`${url}/comments/`)
            .expect('status', 200)
            .expect('json', 'length', 0)
            // .expect('jsonTypes', '*', {
            //     user: Joi.string(),
            //     post: Joi.string()
            // });
            
    });

});
