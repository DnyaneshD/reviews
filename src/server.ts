/// <reference path="../typings/typings.d.ts" />

import * as express from "express";
import { LoginController } from './application/LoginController';
import * as bodyParser from "body-parser";
import * as jsonWebToken from "jsonwebtoken";
let app = express();
let loginContoller = new LoginController();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('jwtSecret', "xyz1122")

//Login route
app.route('/login')
    // show the form (GET http://localhost:8080/login)
    .get(function(req, res) {

        let accessToken = jsonWebToken.sign({}, app.get('jwtSecret'), {
                    //Set the expiration
                    expiresIn: 3600 //we are setting the expiration time of 1 hr. 
                });

       let response = {
           "accessSucess": true,
           "accessToken": accessToken
       }; 

        res.send(response);
    })

    // process the form (POST http://localhost:8080/login)
    .post(function(req, res) {
        let result = loginContoller.login(req.body.userName, req.body.password);
        res.send(result);
    });

app.listen(3000);