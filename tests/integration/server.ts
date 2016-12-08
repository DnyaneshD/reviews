
import * as server  from "../../src/server";
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('/GET book', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/api/reviews')
            .end((err, res) => {
                console.log('Returned');
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });