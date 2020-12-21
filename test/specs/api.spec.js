const chaiHttp = require("chai-http");
const faker = require("faker");
chai.use(chaiHttp);
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhttp = new XMLHttpRequest();

function getToken(email, password) {
  const data = {
    user: { email: "" + email + "", password: "" + password + "" },
  };
  xhttp.open(
    "POST",
    "https://conduit.productionready.io/api/users/login",
    false
  );
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(data));
  let jsonResponse = JSON.parse(xhttp.responseText);
  return jsonResponse.user.token;
}

function createArticle(token, title, description, body) {
  const data = {
    article: {
      author: {},
      title: "" + title + "",
      description: "" + description + "",
      body: "" + body + "",
      tagList: ["tag1", "tag2", "tag1"],
    },
  };
  xhttp.open("POST", "https://conduit.productionready.io/api/articles", false);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization", "Token " + token);
  xhttp.send(JSON.stringify(data));
  let jsonResponse = JSON.parse(xhttp.responseText);
}

describe("When I attemtp to login ", () => {
  it("I should be able to retrieve token", () => {
    let token = getToken(usr_mail, usr_pwd);
    console.log(token);
    expect(token).to.not.be.undefined;
  });

  it("I should be able to create article", () => {
    let token = getToken(usr_mail, usr_pwd);
    let myTitle = faker.lorem.sentence();
    let myDescription = faker.lorem.sentence();
    let myBody = faker.lorem.paragraph();
    createArticle(token, myTitle, myDescription, myBody);
  });

  it("Should return 401 forbidden for invalid credentials login", () => {
    email = "testemail@mail.com";
    password = "testpassword";
    chai
      .request("https://conduit.productionready.io")
      .post("/api/users/login?")
      .send({ user: { email: email, password: password } })
      .end(function (err, res) {
        expect(res).to.have.status(401);
      });
  });

  it("Should return 200 OK for valid credentials login", function () {
    chai
      .request("https://conduit.productionready.io")
      .post("/api/users/login?")
      .send({ user: { email: usr_mail, password: usr_pwd } })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
      });
  });
});
