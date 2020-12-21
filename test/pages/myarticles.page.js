const utils = require('./utils.js');
const { expect } = require('chai');
class MyArticles{
    
    get myArticles() { return utils.getElement('//a[contains(text(),"My Articles")]'); }
    get myFavoritedArticles() { return utils.getElement('//a[contains(text(),"Favorited Articles")]'); }
    get userImg() { return utils.getElement('.user-img'); }
    get editSettings() { return utils.getElement('.user-info a[href="#/settings"]');}

    waitForPageLoaded(){
        expect(this.myArticles).to.not.be.undefined;
        expect(this.myFavoritedArticles).to.not.be.undefined;
        expect(this.userImg).to.not.be.undefined;
        expect(this.editSettings).to.not.be.undefined;
        
        $('//div[contains(text(),"Loading articles...")]').waitForExist({reverse:true})
    }

}
module.exports = new MyArticles();