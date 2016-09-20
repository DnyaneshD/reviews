/// <reference path="../typings/typings.d.ts" />
"use strict";
var chai = require("chai");
var LoginController_1 = require("../src/application/LoginController");
var LoginOAuth_1 = require("../src/application/messages/LoginOAuth");
var expect = chai.expect;
describe('LoginController', function () {
    it('Login test with userName and password', function () {
        //Arrange 
        var loginController = new LoginController_1.LoginController();
        //Act
        var result = loginController.login("test", "password");
        //Assert
        expect(result).to.equal(true);
    });
    it('Login test with OAuth details', function () {
        //Arrange
        var oauth = new LoginOAuth_1.LoginOAuth();
        oauth.email = 'testEmail@Email.com';
        oauth.imageUrl = 'test/image/url';
        oauth.name = 'testName';
        oauth.profileId = 'pRoFiLE010103029230ID';
        var loginController = new LoginController_1.LoginController();
        //Act
        var result = loginController.loginOAuth(oauth);
        //Asset
        expect(result.accessSucess).to.equal(true);
        expect(result.accessToken).to.not.null;
    });
});
