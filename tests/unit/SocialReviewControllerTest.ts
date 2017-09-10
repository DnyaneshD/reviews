import * as chai from "chai";
import { SocialReviewService } from "../../src/application/SocialReviewService";
import { SocialReview } from '../../src/application/messages/SocialReview';

const expect = chai.expect;

describe('SocialReviewController', ()=>{
 it('Validate Review object if review id is passed', (done) =>{
     //Arrange
     let socialReview = new SocialReview();
     let socialReviewCtl = new SocialReviewService();
     socialReviewCtl.addSocailReview(socialReview).then((data) =>{
          //console.log(JSON.stringify(data));
          done();
     });
   });
});
