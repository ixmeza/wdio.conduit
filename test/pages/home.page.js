const utils = require('./utils.js');
const { expect } = require('chai');

class HomePage {

    get headerImg() { return utils.getElement('.banner .logo-font')};
    get homeLink() { return utils.getElement('[class*="nav navbar-nav"] .nav-item [href="#/"]')};
    get signInLink() { return utils.getElement('.nav-item [href="#/login"]');}  
    get signUpLink() { return  utils.getElement('.nav-item [href="#/register"]'); };
    get newArticleLink() { return utils.getElement('.nav-item [href="#/editor"]')};
    get settingsLink() { return utils.getElement('.nav-item [href="#/settings"]')}
    get globalFeed(){ return utils.getElement('//a[contains(text(),"Global Feed")]')};
    get popularTagsList() { return utils.getElement('.sidebar .tag-list')}
    get userNameLink() { return utils.getElement('ul .nav-item:nth-child(4)')}
    
    get footerTxt() { return utils.getElement('.attribution')};

    waitForPageLoaded(){
        expect(this.headerImg).to.not.be.undefined;
        expect(this.homeLink).to.not.be.undefined;
        expect(this.signInLink).to.not.be.undefined;
        expect(this.signUpLink).to.not.be.undefined;
        expect(this.globalFeed).to.not.be.undefined;
        expect(this.popularTagsList).to.not.be.undefined;

        $('//div[contains(text(),"Loading articles...")]').waitForExist({reverse:true})
    }
    
    waitForPageLoadedAuth()
    {
        expect(this.headerImg).to.not.be.undefined;
        expect(this.homeLink).to.not.be.undefined;
        expect(this.settingsLink).to.not.be.undefined;
        expect(this.globalFeed).to.not.be.undefined;
        expect(this.popularTagsList).to.not.be.undefined;
        expect(this.userNameLink).to.not.be.undefined;

        $('//div[contains(text(),"Loading articles...")]').waitForExist({reverse:true})
    }

    userLoggedLink(userName){
        return  utils.getElement(`.nav-item [href='#/@${userName}/']`); 
    };

    articleUser(index){ 
        return utils.getElement(`.article-preview:nth-child(${index}) .author`);
    }
    articleName(index){ 
        return utils.getElement(`.article-preview:nth-child(${index}) h1`);
    }
    articlePreview(index){
        return utils.getElement(`.article-preview:nth-child(${index}) p`);
    }
    articleReadMore(index)
    {
        return utils.getElement(`(//*[text()='Read more...'])[${index}]`);
    }
    favBtn(index) { 
        return utils.getElement(`.article-preview:nth-child(${index}) .btn`);
    }
   
    verifyInFeedArticle(index,title,user,preview)
    {
        this.waitForPageLoadedAuth();
        expect(this.articleName(index).getText()).to.equals(title);
        expect(this.articlePreview(index).getText()).to.contain(preview);
        expect(this.articleUser(index).getText()).to.equals(user);
        expect(this.articleReadMore(index).getText()).to.not.be.undefined;
        expect(this.favBtn(index)).to.not.be.undefined;
    }

    searchFirstNotFav(){
        let buttons = $$('.article-preview');
        for( let i = 0 ; i < buttons.length; i++){
            let aux = $$('.article-preview')[i].$$('.btn-outline-primary').length;
            if(aux > 0)
            {
                return i;
            }
        }
    }

    searchFirstFav(){
        let buttons = $$('.article-preview');
        for( let i = 0 ; i < buttons.length; i++){
            let aux = $$('.article-preview')[i].$$('.btn-primary').length;
            if(aux > 0)
            {
                return i;
            }
        }
    }
}
module.exports = new HomePage();