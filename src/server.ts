/// <reference path="../typings/typings.d.ts" />

import * as express from "express";
import { LoginService } from './application/LoginService';
import { ReviewService } from './application/ReviewService';
import { SocialReviewService } from './application/SocialReviewService';
import * as bodyParser from "body-parser";
import * as jsonWebToken from "jsonwebtoken";
import { LoginOAuth } from "./application/messages/LoginOAuth";
import { ReviewDocument } from "./application/messages/ReviewDocument";
import { SocialReview } from "./application/messages/SocialReview";
import * as nconf from "nconf";
import * as shortid from "shortid";

let app = express();
let loginService = new LoginService();
let reviewService = new ReviewService();
let socialReviewService = new SocialReviewService();

//nconf to load values from config json
nconf.argv()
   .env()
   .file({ file: './config.json' });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Login route
app.route('/api/login')
    // TODO: Remove if not required
    // show the form (GET http://localhost:8080/login)
    .get((req, res) => {
        res.send('Nothing to share');
    })

    // process the form (POST http://localhost:8080/login)
    .post((req, res) => {
        if(req.body.userName && req.body.password){
            let result = loginService.login(req.body.userName, req.body.password);
            res.send(result);
        }
        if(req.body.profileId){

            let oauth = new LoginOAuth();
            oauth.email = req.body.email;
            oauth.imageUrl = req.body.imageUrl; 
            oauth.name  = req.body.name ; 
            oauth.profileId = req.body.profileId; 

            loginService.loginOAuth(oauth).then((token) =>{
               res.send(token);
            });
        }
    });

app.route('/api/review')
    .get((req, res) =>{
        reviewService.getOne(req.params.id).then((result)=>{
           res.send(result);
        });
    })
 
    .post((req, res)=>{
       
       let review = new ReviewDocument();
       review.id = shortid.generate();
       review.topic = req.body.topic;
       review.autherReview = req.body.autherReview;
       review.votes = req.body.votes;
       review.lastUpdated = new Date();
       
       res.send(reviewService.save(review));
    })
    .delete((req, res) =>{
        reviewService.getOne(req.params.id).then((result)=>{
           res.send(result);
        });
    });

app.route('/api/addsocialreview')
    .post((req, res)=>{
        
        let socialReview = new SocialReview();
        socialReview.id = shortid.generate();
        socialReview.review = req.body.socialReview;
        socialReview.lastUpdated = new Date(); 
      
        socialReview.reviewId = req.body.id; 

        socialReviewService.addSocailReview(socialReview).then(() =>{
             res.send();
        });
       
    });    

app.route('/api/review/:id')
    .get((req, res) =>{
        reviewService.getOne(req.params.id).then((result)=>{
           res.send(result);
        });
    });

app.route('/api/reviews')
    .get((req, res) =>{
        res.writeHead(200, {'Content-Type': 'text/event-stream'});
        reviewService.getAll().then((result)=>{
           res.send(result);
        });
    });    

app.listen(3000);

module.exports = app;