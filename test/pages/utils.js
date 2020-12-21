class Utils {
     getElement(selector){
        let $el = $(selector);
        $el.waitForDisplayed(2000);
        return $el;
    }
    getElementText($el)
    {
        return $el.getText();
    }

    isErrorPresent(error,errorList){
        // wait until any li is present on screen
        browser.waitUntil(
            () => errorList.length > 0,
            {
                timeout:3000,
                timeoutMsg: 'expected error to be shown after 3 seconds'
            },
        );
        // for cases where li is present but text needs time to change we need a little delay
        browser.pause(500);
        let errorValues = errorList;
        errorValues.map(function(element) { 
            errorValues.push(element.getText());
            console.log(element.getText());
        })
        return errorValues.indexOf(error) > -1 ? true:false;
    }
   
}
module.exports= new Utils();