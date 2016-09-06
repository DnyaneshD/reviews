/// <reference path="../typings/typings.d.ts" />

import * as express from "express";
import { LoginController } from './application/LoginController';
import * as bodyParser from "body-parser";
import * as jsonWebToken from "jsonwebtoken";

let app = express();
let loginContoller = new LoginController();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Login route
app.route('/login')
    // TODO: Remove if not required
    // show the form (GET http://localhost:8080/login)
    .get(function(req, res) {
        res.send('Nothing Nothing to share');
    })

    // process the form (POST http://localhost:8080/login)
    .post(function(req, res) {
        if(req.body.userName && req.body.password){
            let result = loginContoller.login(req.body.userName, req.body.password);
            res.send(result);
        }
        if(req.body.profileId){
            let token = loginContoller.loginOAuth();
            res.send(token);
        }
    });

app.listen(3000);