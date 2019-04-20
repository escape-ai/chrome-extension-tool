let changeColor = document.getElementById('changeColor');

// var site = location.hostname,
//     title = document.title;
//
// // console.log("Site: " + site + " - Title: " + title);
//
// console.log("lalalalalaa");


function check_title(title) {
    title = title.toString().replace(/\s+/g, ' ').trim();
    var title_display = document.getElementById("title-display");

    title_display.innerHTML = title.toString();
}

function extract_hostname(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.hostname;
}

changeColor.onclick = function (element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
};

chrome.storage.sync.get('color', function (data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

ocument.addEventListener('DOMContentLoaded', function () {
    var title_display = document.getElementById("title-display");
    title_display.innerHTML = "lalalala";

})
