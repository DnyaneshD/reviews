/// <reference path="../typings/typings.d.ts" />

import * as express from "express";
import { LoginController } from './application/LoginController';
import { ReviewController } from './application/ReviewController';
import * as bodyParser from "body-parser";
import * as jsonWebToken from "jsonwebtoken";
import { LoginOAuth } from "./application/messages/LoginOAuth";
import { ReviewDocument } from "./application/messages/ReviewDocument";
import { SocialReview } from "./application/messages/SocialReview";
import * as nconf from "nconf";
import * as shortid from "shortid";

let app = express();
let loginController = new LoginController();
let reviewController = new ReviewController();

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
        res.send('Nothing Nothing to share');
    })

    // process the form (POST http://localhost:8080/login)
    .post((req, res) => {
        if(req.body.userName && req.body.password){
            let result = loginController.login(req.body.userName, req.body.password);
            res.send(result);
        }
        if(req.body.profileId){

            let oauth = new LoginOAuth();
            oauth.email = req.body.email;
            oauth.imageUrl = req.body.imageUrl; 
            oauth.name  = req.body.name ; 
            oauth.profileId = req.body.profileId; 

            loginController.loginOAuth(oauth).then((token) =>{
               res.send(token);
            });
        }
    });

app.route('/api/review')
    .get((req, res) =>{
        reviewController.getOne(req.params.id).then((result)=>{
           res.send(result);
        });
    })
    // `.put((req, res)=>{
       
    //    let review = new ReviewDocument();
    //    review.id = req.body.id;
    //    review.topic = req.body.topic;
    //    review.autherReview = req.body.autherReview;
    //    review.votes = req.body.votes;
    //    review.lastUpdated = new Date();
       
    //    res.send(reviewController.update(review));
    // }``
    .post((req, res)=>{
       
       let review = new ReviewDocument();
       review.id = shortid.generate();
       review.topic = req.body.topic;
       review.autherReview = req.body.autherReview;
       review.votes = req.body.votes;
       review.lastUpdated = new Date();
       
       res.send(reviewController.save(review));
    })
    .delete((req, res) =>{
        reviewController.getOne(req.params.id).then((result)=>{
           res.send(result);
        });
    });

app.route('/api/addsocialreview')
    .post((req, res)=>{
        
        let socialReview = new SocialReview();
        socialReview.id = shortid.generate();
        socialReview.review = req.body.socialReview;
        socialReview.lastUpdated = new Date(); 

        
        res.send(reviewController.addSocailReview(socialReview));
    });    

app.route('/api/review/:id')
    .get((req, res) =>{
        reviewController.getOne(req.params.id).then((result)=>{
           res.send(result);
        });
    });

app.listen(3000);