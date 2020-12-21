const login = require("../pages/signup.page.js");
const home = require("../pages/home.page.js");
const { expect } = require("chai");
describe("When I attemtp to login ", () => {
  beforeEach(function () {
    browser.url("https://vue-vuex-realworld.netlify.app/#/login");
  });
  it("I should not be able to login with blank email and password", () => {
    login.signUpBtn.click();
    expect(login.isErrorPresent("email or password is invalid")).to.be.true;
  });

  it("I should not be able to login with blank password", () => {
    login.enterEmail("test@test.com");
    login.signUpBtn.click();
    expect(login.isErrorPresent("email or password is invalid")).to.be.true;
  });
  it("I should not be able to login with incorrect password", () => {
    login.enterEmail("imotest@mail.com");
    login.enterPassword("test12345678");
    login.signUpBtn.click();
    expect(login.isErrorPresent("email or password is invalid")).to.be.true;
  });

  it("I should be able to login with valid credentials", () => {
    //same as above it's just a different approach using a sign method in login object
    login.sign(usr_mail, usr_pwd);
    expect(home.userLoggedLink("imoTest")).to.not.be.undefined;
  });
});
