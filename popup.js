$(function(){
    const copy = e => {
        let copiedText = e.target.dataset.text;
        const element = document.createElement('textarea');
        element.value = copiedText;
        document.body.appendChild(element);
        element.select();
        document.execCommand('copy');
        document.body.removeChild(element);
    }

    chrome.storage.sync.get('currLinks',function(links){
        let newLinks = [];
        if(links.currLinks){
            newLinks = links.currLinks.slice();
        }
        let linksHtml = newLinks.map(link => 
            `<li class="list-link">
                <span data-text="${link}">${link}</span>
            </li>`)
            .join('');
        $("#text-list").html(linksHtml);
        let texts = [...document.querySelectorAll(".list-link")];
        texts.forEach(text => {
            text.addEventListener('click',copy);
        });
    })
})