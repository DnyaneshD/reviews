/// <reference path="../typings/typings.d.ts" />

import * as express from "express";
import { LoginController } from './application/LoginController';
import * as bodyParser from "body-parser";
import * as jsonWebToken from "jsonwebtoken";

let app = express();
let loginContoller = new LoginController();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Login route
app.route('/login')
    // TODO: Remove if not required
    // show the form (GET http://localhost:8080/login)
    .get(function(req, res) {
    })

    // process the form (POST http://localhost:8080/login)
    .post(function(req, res) {
        
        let result = loginContoller.login(req.body.userName, req.body.password);
        res.send(result);
    });

app.listen(3000);