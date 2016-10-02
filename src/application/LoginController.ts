/// <reference path="../../typings/typings.d.ts" />

import { JsonWebToken } from '../lib/JsonWebToken';
import { MongoDB } from '../lib/MongoDB'
import { LoginOAuth } from "./messages/LoginOAuth";


export class LoginController {

    //Login will be implemented when Login and Password saved in DB
    login(userName, password) {

        if(userName === "test" && password === "password"){
           return true;
        }
    }

    //OAuth token will be exchanged and login token will be created 
    loginOAuth(oauth : LoginOAuth): any {
         new Promise((resolve,reject) =>{
             new MongoDB().create(oauth).then((result)=>{
               resolve();
             });
         }).then(()=>{
            return new JsonWebToken().create();  
         }).catch((err)=>{
             console.log(err);
         });  
    }
} 