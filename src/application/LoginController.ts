/// <reference path="../../typings/typings.d.ts" />

import * as jsonWebToken from "jsonwebtoken";

export class LoginController {

    //Login will be implemented when Login and Password saved in DB
    login(userName, password) {

    }

    //OAuth token will be exchanged and login token will be created 
    loginOAuth() {

        let accessToken = jsonWebToken.sign({}, "xyz1122", {
            expiresIn: 3600 //set expirty of token 
        });

        let response = {
            "accessSucess": true,
            "accessToken": accessToken
        };

        return response;
    }
} 