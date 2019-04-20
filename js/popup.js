let changeColor = document.getElementById('changeColor');

function check_title(title) {
    title = title.toString().replace(/\s+/g, ' ').trim();
    var title_display = document.getElementById("title-display");

    title_display.innerHTML = title.toString();
}

chrome.storage.sync.get('domains', function (domains) {

});

document.addEventListener('DOMContentLoaded', function () {
    var title_display = document.getElementById("title-display");
    title_display.innerHTML = "lalalala";
});
