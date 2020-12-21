const utils = require("./utils.js");
const { expect } = require("chai");

class ArticlePage {
  get bannerEditArticle() {
    return $(".banner i.ion-edit");
  }
  get bannerDeleteArticle() {
    return $(".banner i.ion-trash-a");
  }
  get bannerTitle() {
    return utils.getElement(".banner h1");
  }
  get bannerDate() {
    return utils.getElement(".banner .date");
  }
  get bannerAuthor() {
    return utils.getElement(".banner .author");
  }

  get containerEditArticle() {
    return $(".article-actions i.ion-edit");
  }
  get containerDeleteArticle() {
    return $(".article-actions i.ion-trash-a");
  }
  get containerAuthor() {
    return utils.getElement(".article-actions .author");
  }
  get containerDate() {
    return utils.getElement(".article-actions .date");
  }

  get articleTextArea() {
    return utils.getElement(".card-block  textarea");
  }
  get articlePostCommentBtn() {
    return utils.getElement(".card-footer button");
  }

  get articleTagList() {
    return utils.getElement(".tag-list");
  }
  get articleContent() {
    return utils.getElement(".row.article-content p");
  }

  waitForPageLoadedAuth() {
    expect(this.bannerEditArticle).to.not.be.undefined;
    expect(this.bannerDeleteArticle).to.not.be.undefined;
    expect(this.bannerTitle).to.not.be.undefined;
    expect(this.bannerDate).to.not.be.undefined;
    expect(this.bannerAuthor).to.not.be.undefined;
    expect(this.containerDeleteArticle).to.not.be.undefined;
    expect(this.containerDate).to.not.be.undefined;
    expect(this.articleTextArea).to.not.be.undefined;
    expect(this.articlePostCommentBtn).to.not.be.undefined;
    expect(this.articleContent).to.not.be.undefined;
  }
  waitForPageLoaded() {
    expect(this.bannerTitle).to.not.be.undefined;
    expect(this.bannerDate).to.not.be.undefined;
    expect(this.bannerAuthor).to.not.be.undefined;
    expect(this.containerDate).to.not.be.undefined;
    expect(this.articleTextArea).to.not.be.undefined;
    expect(this.articlePostCommentBtn).to.not.be.undefined;
    expect(this.articleTagList).to.not.be.undefined;
    expect(this.articleContent).to.not.be.undefined;
  }
}
module.exports = new ArticlePage();
