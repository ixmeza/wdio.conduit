const utils = require('./utils.js')
const { expect } = require('chai')

class SignUp {
    get userName() { return utils.getElement("[placeholder='Username']")}
    get email () { return utils.getElement("[placeholder='Email']")}
    get pwd(){return utils.getElement("[placeholder='Password']")}
    get signUpBtn(){ return utils.getElement('.btn-primary')}
    get errorList() { return $$('.error-messages li')}
    get needAcountLink() { return utils.getElement('.auth-page a[href="#/register"]')}

    open()
    {
        browser.url('https://vue-vuex-realworld.netlify.app/#/register')
    }

    waitForPageLoaded()
    {
        expect(this.userName).to.not.be.undefined;
        expect(this.email).to.not.be.undefined;
        expect(this.pwd).to.not.be.undefined;
        expect(this.signUpBtn).to.not.be.undefined;
    }

    enterUserName(username)
    {
        this.userName.clearValue();
        this.userName.setValue(username);
    }
    enterEmail(email){
        this.email.clearValue();
        this.email.setValue(email);
    }
    enterPassword(password)
    {
        this.pwd.clearValue();
        this.pwd.setValue(password);
    }

    sign(email,password)
    {
        this.needAcountLink.waitForExist();
        this.email.waitForExist()
        this.password;
        this.enterEmail(email);
        this.enterPassword(password);
        this.signUpBtn.click();
    }

    isErrorPresent(error){
        // wait until any li is present on screen
        browser.waitUntil(
            () => this.errorList.length > 0,
            {
                timeout:3000,
                timeoutMsg: 'expected error to be shown after 2 seconds'
            },
        );
        // for cases where li is present but text needs time to change we need a little delay
        browser.pause(500);
        let errorValues=this.errorList;
        errorValues.map(function(element) { 
            errorValues.push(element.getText());
            console.log(element.getText());
        })
        return errorValues.indexOf(error) > -1 ? true:false;
    }
}
module.exports = new SignUp();