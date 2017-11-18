/// <reference path="./typings/typings.d.ts" />
"use strict";
var express = require("express");
var LoginService_1 = require('./src/application/LoginService');
var ReviewService_1 = require('./src/application/ReviewService');
var SocialReviewService_1 = require('./src/application/SocialReviewService');
var bodyParser = require("body-parser");
var LoginOAuth_1 = require("./src/application/messages/LoginOAuth");
var ReviewDocument_1 = require("./src/application/messages/ReviewDocument");
var SocialReview_1 = require("./src/application/messages/SocialReview");
var nconf = require("nconf");
var shortid = require("shortid");
var app = express();
var loginService = new LoginService_1.LoginService();
var reviewService = new ReviewService_1.ReviewService();
var socialReviewService = new SocialReviewService_1.SocialReviewService();
//nconf to load values from config json
nconf.argv()
    .env()
    .file({ file: './config.json' });
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//Login route
app.route('/api/login')
    .get(function (req, res) {
    res.send('Nothing to share');
})
    .post(function (req, res) {
    if (req.body.userName && req.body.password) {
        var result = loginService.login(req.body.userName, req.body.password);
        res.send(result);
    }
    if (req.body.profileId) {
        var oauth = new LoginOAuth_1.LoginOAuth();
        oauth.email = req.body.email;
        oauth.imageUrl = req.body.imageUrl;
        oauth.name = req.body.name;
        oauth.profileId = req.body.profileId;
        loginService.loginOAuth(oauth).then(function (token) {
            res.send(token);
        });
    }
});
app.route('/api/review')
    .get(function (req, res) {
    reviewService.getOne(req.params.id).then(function (result) {
        res.send(result);
    });
})
    .post(function (req, res) {
    var review = new ReviewDocument_1.ReviewDocument();
    review.id = shortid.generate();
    review.topic = req.body.topic;
    review.autherReview = req.body.autherReview;
    review.votes = req.body.votes;
    review.lastUpdated = new Date();
    res.send(reviewService.save(review));
})
    .delete(function (req, res) {
    reviewService.getOne(req.params.id).then(function (result) {
        res.send(result);
    });
});
app.route('/api/addsocialreview')
    .post(function (req, res) {
    var socialReview = new SocialReview_1.SocialReview();
    socialReview.id = shortid.generate();
    socialReview.review = req.body.socialReview;
    socialReview.lastUpdated = new Date();
    socialReview.reviewId = req.body.id;
    socialReviewService.addSocailReview(socialReview).then(function () {
        res.send();
    });
});
app.route('/api/review/:id')
    .get(function (req, res) {
    reviewService.getOne(req.params.id).then(function (result) {
        res.send(result);
    });
});
app.route('/api/reviews')
    .get(function (req, res) {
    reviewService.getAll().then(function (result) {
        res.send(result);
    });
});
app.listen(3000);
process.on('uncaughtException', function () {
});
module.exports = app;
