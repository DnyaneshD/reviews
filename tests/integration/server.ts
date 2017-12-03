
import * as server  from "../../src/server";
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;

describe('/GET book', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/api/login')
            .end((err, res) => {
                expect(res.status,200);
              done();
            });
      });
  });