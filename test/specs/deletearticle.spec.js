const article = require("../pages/article.page.js");
const signIn = require("../pages/signup.page.js");
const home = require("../pages/home.page.js");
const myarticles = require("../pages/myarticles.page.js");
const { expect } = require("chai");

describe("When I go to an article page", () => {
  let deletedTitle;

  it("I should not be able to delete an article that is not mine", () => {
    browser.url("https://vue-vuex-realworld.netlify.app/#/@MariPuri/");
    // click on first article in page
    let link = $(".article-preview:nth-child(1) a.preview-link");
    link.click();
    // delete article should not be displayed
    article.bannerDeleteArticle.waitForExist({ reverse: true });
    article.containerDeleteArticle.waitForExist({ reverse: true });
  });

  it("I should be able to delete an article which is mine", () => {
    // Login
    browser.url("https://vue-vuex-realworld.netlify.app/#/login");
    signIn.sign(usr_mail, usr_pwd);
    home.waitForPageLoadedAuth();
    home.userNameLink.click();
    myarticles.waitForPageLoaded();
    // click on first article in page
    myarticles.waitForPageLoaded();
    $(".article-preview:nth-child(1) a.preview-link").click();
    article.waitForPageLoadedAuth();
    deletedTitle = article.bannerTitle.getText();
    article.bannerDeleteArticle.click();
    home.waitForPageLoadedAuth();
  });

  it("I should not longer see the article I deleted", () => {
    // Login
    browser.url("/");
    home.waitForPageLoadedAuth();
    // check h1's for deleted article
    browser.pause(1000);
    let titl = $$("h1");
    let deleted = false;
    for (let i = 0; i < titl.length - 1; i++) {
      let titles = $$(".article-preview")[i];
      expect(`${titles.$("h1").getText()}`).to.not.equal(deletedTitle);
    }
  });
});
