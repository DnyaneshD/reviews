/// <reference path="../../typings/typings.d.ts" />

import { JsonWebToken } from '../lib/JsonWebToken';
import { MongoDB } from '../lib/MongoDB'
import { LoginOAuth } from "./messages/LoginOAuth";


export class LoginService {

    //Login will be implemented when Login and Password saved in DB
    login(userName, password) {

        if(userName === "test" && password === "password"){
           return true;
        }
    }

    //OAuth token will be exchanged and login token will be created 
    loginOAuth(oauth : LoginOAuth): Promise<any> {
         
        return  new Promise<any>((resolve,reject) =>{
             console.log('LoginController::loginOAuth - Login request handled');
             new MongoDB().create(oauth,'LoginDetails').then((result)=>{
                 console.log('LoginController::loginOAuth - Login request resolving');
             }).then(()=>{
                 let result = new JsonWebToken().create(); 
                 resolve(result);  
            }).catch((err)=>{
                console.log(err);
            });  
        });
    }
} 