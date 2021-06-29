$(function(){
    let newLinks = [];
    let removeText = e => {
        let idx = e.target.dataset.index;
        $("#" + idx).parent().find('span').css("text-decoration", "line-through"); 
        newLinks.splice(idx,1);
        chrome.storage.sync.set({"currLinks" : newLinks},()=>{
            chrome.notifications.create(
                "remove-notification",
                {
                    type : "basic",
                    iconUrl : "public/icon48.png",
                    title : "CliprX",
                    message : "Text removed from clipboard"
                },
                function(){}
            )
        });
    }
    let removeAll = () => {
        let newArray = [];
        chrome.storage.sync.set({"currLinks" : newArray},()=>{
            chrome.notifications.create(
                "remove-notification",
                {
                    type : "basic",
                    iconUrl : "icon48.png",
                    title : "Clipboard",
                    message : "Removed everything!"
                },
                function(){}
            )
        });
    }
    chrome.storage.sync.get("currLinks",function(links){
        if(links.currLinks){
            newLinks = links.currLinks.slice();
        }
        let optionsUL = newLinks.map((text,index) => 
            `<li class="option-page-list-item">
                <span>${text} </span><button id="${index}"class="delete-entry" data-index="${index}">"delete icon"</button> 
            </li>`
        ).join('');
        $("#options-page-list").html(optionsUL);
        let deleteButtons = [...document.querySelectorAll(".delete-entry")];
        deleteButtons.forEach(button => {
            button.addEventListener('click',removeText);
        });
    })
    $("#remove-all-items").on('click',()=>{
        removeAll();
    });
    
})