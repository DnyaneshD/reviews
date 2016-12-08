"use strict";
var server = require("../../src/server");
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
describe('/GET book', function () {
    it('it should GET all the books', function (done) {
        chai.request(server)
            .get('/api/reviews')
            .end(function (err, res) {
            console.log('Returned');
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
        });
    });
});
