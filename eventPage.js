


chrome.browserAction.onClicked.addListener(function(current_tab) {
    chrome.tabs.create({url: "https://www.reddit.com",active: true});
    chrome.tabs.create({url: chrome.extension.getURL("closed_urls.html"),active: false});

});