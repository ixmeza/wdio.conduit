const article = require("../pages/article.page.js");
const signIn = require("../pages/signup.page.js");
const edit = require("../pages/newarticle.page.js");
const home = require("../pages/home.page.js");
const myarticles = require("../pages/myarticles.page.js");
const faker = require("faker");
const { expect } = require("chai");

describe("When I go to an article page", () => {
  it("I should not be able to edit an article that is not mine", () => {
    browser.url("https://vue-vuex-realworld.netlify.app/#/@MariPuri/");
    // click on first article in page
    let link = $(".article-preview:nth-child(1) a.preview-link");
    link.click();
    // edit article options should not be displayed since we don't have permissions on it
    article.bannerEditArticle.waitForExist({ reverse: true });
    article.containerEditArticle.waitForExist({ reverse: true });
  });

  it("I should be able to edit my article", () => {
    browser.url("https://vue-vuex-realworld.netlify.app/#/login");
    signIn.needAcountLink.waitForExist();
    signIn.sign(usr_mail, usr_pwd);
    home.waitForPageLoadedAuth();
    home.userNameLink.click();
    myarticles.waitForPageLoaded();
    // *****
    // there is a bug in the app if it goes too fast it loads
    // the global feed instead of user's
    // *****
    $('//div[contains(text(),"Loading articles...")]').waitForExist({
      reverse: true,
    });
    // click on second article in page
    $(".article-preview:nth-child(2) a.preview-link").click();
    article.containerEditArticle.click();
    edit.publishArticleBtn.waitForExist();
    // generating random values
    let randomTitle = faker.lorem.sentence();
    let randomAbout = faker.lorem.sentence();
    let randomBody = faker.lorem.paragraph();
    // updating values
    edit.enterValues(randomTitle, randomAbout, randomBody);
    // validating
    expect(edit.articleTitle.getValue()).to.equal(`${randomTitle}`);
    expect(edit.articleAbout.getValue()).to.equal(`${randomAbout}`);
    expect(edit.articleContent.getValue()).to.equal(`${randomBody}`);

    // saving changes

    edit.publishArticleBtn.click();

    // verify changes in content
    expect(article.bannerTitle.getText()).to.equal(`${randomTitle}`);
    expect(article.articleContent.getText()).to.equal(`${randomBody}`);

    article.containerEditArticle.click();
    expect(edit.articleAbout.getValue()).to.equal(`${randomAbout}`);
  });
});
