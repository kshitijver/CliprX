
let contextMenuItem = {
    "id" : "selected-text",
    "title" : "Add to CliprX",
    "contexts" : ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

function isString(val){
    if (typeof val === 'string' || val instanceof String) {
        return true;
    }
    return false;
}
chrome.contextMenus.onClicked.addListener(function(selectedData){
    if(selectedData.menuItemId == "selected-text" && selectedData.selectionText){
        if(isString(selectedData.selectionText)){
            chrome.storage.sync.get('currLinks',function(links){
                let newLinks = [];
                if(links.currLinks){
                    newLinks = links.currLinks.slice();
                }
                newLinks.unshift(selectedData.selectionText);
                if(newLinks.length > 10){
                    newLinks.pop();
                }
                chrome.storage.sync.set({"currLinks" : newLinks},()=>{
                    chrome.notifications.create(
                        "my-new-notification",
                        {
                            type : "basic",
                            iconUrl : "public/icon48.png",
                            title : "CliprX",
                            message : "Text added to clipboard"
                        },
                        function(){}
                    );
                });
            })
        }
    }
})