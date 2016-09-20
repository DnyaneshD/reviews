/// <reference path="../../typings/typings.d.ts" />
import * as jsonWebToken from "jsonwebtoken";

export class JsonWebToken{
      
      create(){
        
        return {
            "accessSucess": true,
            "accessToken": jsonWebToken.sign({}, "xyz1122", {
                expiresIn: 3600 //set expirty of token 
            })
        };
      }
}
