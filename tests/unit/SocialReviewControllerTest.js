"use strict";
var chai = require("chai");
var SocialReviewService_1 = require("../../src/application/SocialReviewService");
var SocialReview_1 = require('../../src/application/messages/SocialReview');
var expect = chai.expect;
describe('SocialReviewController', function () {
    it('Validate Review object if review id is passed', function (done) {
        //Arrange
        var socialReview = new SocialReview_1.SocialReview();
        var socialReviewCtl = new SocialReviewService_1.SocialReviewService();
        socialReviewCtl.addSocailReview(socialReview).then(function (data) {
            //console.log(JSON.stringify(data));
            done();
        });
    });
});
