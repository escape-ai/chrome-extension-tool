chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("RECEIVED MESSAGE");
    if (message.msg === "articleInfo") {
        console.log(message.data);
    }
});

function updateContent() {

}

document.addEventListener('DOMContentLoaded', function () {
    let headline = document.getElementById("title");
    let truth_value = document.getElementById("truth-value");
    chrome.storage.sync.get('articleInfo', function (data) {
        let articleInfo = data.articleInfo;
        console.log(articleInfo);
        headline.innerHTML = articleInfo.headline;
    });
});
