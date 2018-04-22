"use strict";
var server = require("../../src/server");
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
describe('/GET book', function () {
    it('it should GET all the books', function (done) {
        chai.request(server)
            .get('/api/login')
            .end(function (err, res) {
            expect(res.status, 200);
            done();
        });
    });
});
