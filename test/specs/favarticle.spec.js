const home = require("../pages/home.page.js");
const signIn = require("../pages/signup.page.js");
const { expect } = require("chai");

describe("When I go to an conduit page", () => {
  it("I should not be able to fav a comment in Global Feed if I am not authenticated", () => {
    browser.url("/");
    home.waitForPageLoaded();
    home.favBtn(1).click();
    expect(signIn.email).to.not.be.undefined;
  });

  it("I should be able to fav a comment in Global Feed if I am authenticated", () => {
    //login
    browser.url("https://vue-vuex-realworld.netlify.app/#/login");
    signIn.sign(usr_mail, usr_pwd);
    home.waitForPageLoadedAuth();
    let index = home.searchFirstNotFav();
    let favbtn = $$(".article-preview .btn")[index];
    let counter = favbtn.$(".counter").getText();
    favbtn.click();
    browser.pause(2000);
    favbtn = $$(".article-preview .btn")[index];
    expect(parseInt(favbtn.$(".counter").getText())).to.be.greaterThan(
      parseInt(counter)
    );
  });

  it("I should be able to un-fav a faved comment in Global Feed if I am authenticated", () => {
    //login
    browser.url("https://vue-vuex-realworld.netlify.app/#/login");
    signIn.sign(usr_mail, usr_pwd);
    home.waitForPageLoadedAuth();
    let index = home.searchFirstFav();
    let favbtn = $$(".article-preview .btn")[index];
    let counter = favbtn.$(".counter").getText();
    favbtn.click();
    browser.pause(2000);
    favbtn = $$(".article-preview .btn")[index];
    expect(parseInt(favbtn.$(".counter").getText())).to.be.below(
      parseInt(counter)
    );
  });
});
