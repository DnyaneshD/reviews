/// <reference path="../../typings/typings.d.ts" />

import * as chai from "chai";
import { LoginService } from "../../src/application/LoginService"
import { LoginOAuth } from "../../src/application/messages/LoginOAuth"

const expect = chai.expect;

describe('LoginController', function() {
  it('Login test with userName and password', function() {
    
    //Arrange 
    var loginController = new LoginService();
    
    //Act
    let result = loginController.login("test", "password")
    
    //Assert
    expect(result).to.equal(true);
  });

  it('Login test with OAuth details', function() {

    //Arrange
    let oauth = new LoginOAuth();
    oauth.email = 'testEmail@Email.com';
    oauth.imageUrl = 'test/image/url'; 
    oauth.name  = 'testName' ; 
    oauth.profileId = 'pRoFiLE010103029230ID';

    var loginController = new LoginService();
    
    //Act
    loginController.loginOAuth(oauth).then((result) =>{
        //Asset
        expect(result.accessSucess).to.equal(true);
        expect(result.accessToken).to.not.null;
    });
  }); 

});