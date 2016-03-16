


function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }
    if (domain.indexOf("www.") == 0){ domain=domain.slice(4);}
    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

// function makeUL(array) {
//     // Create the list element:
//     var list = document.createElement('ul');

//     for(var i = 0; i < array.length; i++) {
//         // Create the list item:
//         var item = document.createElement('li');

//         // Set its contents:
//         item.appendChild(document.createTextNode(array[i]));

//         // Add it to the list:
//         list.appendChild(item);
//     }

//     // Finally, return the constructed list:
//     return list;
// }


function makeUL(array){
    var list = document.createElement('ul');
    for (var url in array) {
        var item = document.createElement('li');        
        var textpart=document.createTextNode(array[url]+" ----  "+url);
        var a=document.createElement('A');
        a.setAttribute("href",url);
        a.appendChild(textpart);
        item.appendChild(a);
        list.appendChild(item);
    }
    return list;
}




    // chrome.runtime.onMessage.addListener(
    //   function(request, sender, sendResponse) {
    //     // if(request.data == "setBackground") document.body.style.background = "red";
    //     document.getElementById("urllist").appendChild(makeUL(request.data));
    //   });

document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({currentWindow: true}, function(tabs){
        var closed_tabs={};
        for (var i = 0; i < tabs.length; i++) {
            if ( domains.indexOf(extractDomain(tabs[i].url)) > -1 ){
                // url=tabs[i].url;
                closed_tabs[tabs[i].url]=tabs[i].title;
                chrome.tabs.remove(tabs[i].id,function(i)
                    {
                        return function()
                        {
                            console.log(tabs[i].url+" closed...");

                        };
                    }(i)
                );
            }
        }
        console.log("closed tabs: \n");
        console.log(closed_tabs);
        document.getElementById("urllist").appendChild(makeUL(closed_tabs));
    
    });

});