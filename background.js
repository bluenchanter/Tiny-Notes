

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "openPopup") {
        chrome.windows.create({
            url: "notes.html", 
            type: "popup",     
            width: 600,        
            height: 400        
        });
    }
});