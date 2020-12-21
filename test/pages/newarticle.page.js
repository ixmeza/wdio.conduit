const utils = require("./utils.js");
class NewArticle {
  get articleTitle() {
    return utils.getElement("input[placeholder='Article Title']");
  }
  get articleAbout() {
    return utils.getElement(`input[placeholder="What's this article about?"]`);
  }
  get articleContent() {
    return utils.getElement(
      "textarea[placeholder='Write your article (in markdown)']"
    );
  }
  get articleTags() {
    return utils.getElement("input[placeholder='Enter tags']");
  }
  get publishArticleBtn() {
    return utils.getElement("form button[type='submit']");
  }
  get errorList() {
    return $$(".error-messages li");
  }

  waitForPageLoaded() {
    expect(this.articleTitle).to.not.be.undefined;
    expect(this.articleAbout).to.not.be.undefined;
    expect(this.articleContent).to.not.be.undefined;
    expect(this.articleTags).to.not.be.undefined;
    expect(this.publishArticleBtn).to.not.be.undefined;
  }

  tagDeleteBtn(tagName) {
    this.waitForPageLoaded();
    let tag = $$(
      `//span[@class='tag-default tag-pill'][contains(text(), '${tagName}')]/i`
    );
    if (tag.length > 0) {
      // tag exist
      // if more than 1 tag with same name we just want to same the first
      return tag[0];
    } else {
      // tag does not exist
    }
  }

  enterValues(title, about, content) {
    this.enterTitle(title);
    this.enterAbout(about);
    this.enterBody(content);
  }

  enterTitle(title) {
    this.waitForPageLoaded();
    this.articleTitle.clearValue();
    this.articleTitle.setValue(title);
  }
  enterAbout(about) {
    this.waitForPageLoaded();
    this.articleAbout.clearValue();
    this.articleAbout.setValue(about);
  }
  enterBody(content) {
    this.waitForPageLoaded();
    this.articleContent.clearValue();
    this.articleContent.setValue(content);
  }
  enterTag(tags) {
    // for each tag
    this.waitForPageLoaded();
    if (tags instanceof Array) {
      tags.forEach((element) => {
        this.articleTags.setValue(element);
        browser.keys("Enter");
        browser.pause(200);
      });
    } else {
      this.articleTags.setValue(tags);
      browser.keys("Enter");
      browser.pause(200);
    }
  }
  deleteTag(tags) {
    this.waitForPageLoaded();
    if (tags instanceof Array) {
      tags.forEach((element) => {
        if (this.tagDeleteBtn(element) != undefined)
          this.tagDeleteBtn(element).click();
      });
    } else {
      this.tagDeleteBtn(tags).click();
    }
  }
  isErrorPresent(error) {
    this.waitForPageLoaded();
    return utils.isErrorPresent(error, this.errorList);
  }
  publishArticle(title, about, content, tags) {
    this.waitForPageLoaded();
    this.enterTitle(title);
    this.enterAbout(about);
    this.enterBody(content);
    if (tags) {
      this.enterTag(tags);
    }

    this.publishArticleBtn.click();
  }
}
module.exports = new NewArticle();
