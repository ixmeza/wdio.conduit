const sign = require("../pages/signup.page.js");

describe("When I go to Sign Up page - negative scenarios validation", () => {
  beforeEach(() => {
    //Navigates to the page
    sign.open();
    console.log("Session ID is: " + browser.sessionId);
  });

  it("I should not be able to register using blank email", () => {
    sign.signUpBtn.click();
    expect(sign.isErrorPresent(`email can't be blank`)).to.be.true;
  });

  it("I should not be able to register using blank username", () => {
    sign.signUpBtn.click();
    expect(sign.isErrorPresent(`username can't be blank`)).to.be.true;
  });
  it("I should not be able to register using blank password", () => {
    sign.signUpBtn.click();
    expect(sign.isErrorPresent(`password can't be blank`)).to.be.true;
  });

  it("I should not be able to register using invalid email", () => {
    sign.enterEmail("test");
    sign.signUpBtn.click();
    expect(sign.isErrorPresent(`email is invalid`)).to.be.true;
  });

  it("I should not be able to register using already taken username", () => {
    sign.enterUserName("test");
    sign.signUpBtn.click();
    expect(sign.isErrorPresent("username has already been taken")).to.be.true;
  });
  it("I should not be able to register using already taken email", () => {
    sign.enterEmail("test@test.com");
    sign.signUpBtn.click();
    expect(sign.isErrorPresent("email has already been taken")).to.be.true;
  });

  it("I should not be able to register using a password shorter than 8 characters", () => {
    sign.enterPassword("123");
    sign.signUpBtn.click();
    expect(
      sign.isErrorPresent("password is too short (minimum is 8 characters)")
    ).to.be.true;
  });
});
