const article = require("../pages/newarticle.page.js");
const signIn = require("../pages/signup.page.js");
const home = require("../pages/home.page.js");
const viewarticle = require("../pages/article.page.js");

const { expect } = require("chai");
const faker = require("faker");

describe("When I attempt to create an article", () => {
  it("I should see article textbox", () => {
    browser.url("https://vue-vuex-realworld.netlify.app/#/login");
    signIn.sign(usr_mail, usr_pwd);
    browser.pause(1000);
    home.newArticleLink.click();
    expect(article.articleTitle).to.not.be.undefined;
  });

  it("I should see article about textbox", () => {
    expect(article.articleAbout).to.not.be.undefined;
  });

  it("I should see write article textarea", () => {
    expect(article.articleContent).to.not.be.undefined;
  });

  it("I should tags texbox", () => {
    expect(article.articleTags).to.not.be.undefined;
  });

  it("I should see publish article button", () => {
    expect(article.publishArticleBtn).to.not.be.undefined;
  });

  it("I should not be allowed to publish article without values", () => {
    article.publishArticleBtn.click();
    browser.pause(1000);
    expect(
      article.isErrorPresent(
        "titlecan't be blankis too short (minimum is 1 character)"
      )
    ).to.be.true;
    expect(article.isErrorPresent("bodycan't be blank")).to.be.true;
    expect(
      article.isErrorPresent(
        "descriptioncan't be blankis too short (minimum is 1 character)"
      )
    ).to.be.true;
  });

  it("I should not be allowed to publish article without title", () => {
    browser.refresh();
    article.articleTitle.waitForExist();
    article.publishArticleBtn.click();
    browser.pause(1000);
    expect(
      article.isErrorPresent(
        "titlecan't be blankis too short (minimum is 1 character)"
      )
    ).to.be.true;
  });

  it("I should not be allowed to publish article without body", () => {
    let tags = ["tag1", "tag2"];
    article.publishArticle("imoTitle", "imoAbout", "", tags);
  });

  it("I should not be allowed to publish article without description", () => {
    browser.refresh();
    article.articleTitle.waitForExist();
    article.publishArticle("imoTitle", "", "imoAbout");
  });

  it("I should be allowed to create tags", () => {
    browser.refresh();
    article.articleTitle.waitForExist();
    let tags = ["tag1", "tag2", "tag3"];
    article.enterTag(tags);
    expect(article.tagDeleteBtn("tag1")).to.not.be.undefined;
    expect(article.tagDeleteBtn("tag2")).to.not.be.undefined;
    expect(article.tagDeleteBtn("tag3")).to.not.be.undefined;
  });

  it("I should be allowed to delete tags", () => {
    browser.refresh();
    article.articleTitle.waitForExist();
    let tags = ["tag1", "tag2", "tag3", "tag2"];
    article.enterTag(tags);
    article.deleteTag(tags);
  });

  it("I should allow to publish article", () => {
    browser.refresh();
    article.articleTitle.waitForExist();
    let tags = ["tag1", "tag2", "tag3"];
    let title = faker.lorem.sentence();
    let description = faker.lorem.sentence();
    let body = faker.lorem.paragraph();
    let user = "imoTest";
    let preview = description;
    article.publishArticle(title, description, body, tags);
    viewarticle.waitForPageLoadedAuth();
    home.homeLink.click();
    home.waitForPageLoadedAuth();
    $('//div[contains(text(),"Loading articles...")]').waitForExist({
      reverse: true,
    });
    home.verifyInFeedArticle(1, title, user, preview);
  });
});
