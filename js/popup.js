document.addEventListener('DOMContentLoaded', function () {
    let title = document.getElementById("title");
    let headline = document.getElementById("headline");
    let tags = document.getElementById("tags");
    let tagTemplate = document.querySelector("#tag-template");
    let pollPublic = document.getElementById("poll-public");
    let pollExpert = document.getElementById("poll-expert");
    let publicTrueBar = document.getElementById("public-true-ratio");
    let publicFalseBar = document.getElementById("public-false-ratio");
    let expertTrueBar = document.getElementById("expert-true-ratio");
    let expertFalseBar = document.getElementById("expert-false-ratio");
    let truth = document.getElementById("truth");
    let truth_value = document.getElementById("truth-value");
    let rating = document.getElementById("rating");

    chrome.storage.sync.get('articleInfo', function (data) {
        let articleInfo = data.articleInfo;
        headline.innerHTML = articleInfo['headline'];

        for (let tagName of articleInfo.tags) {
            let tag = document.importNode(tagTemplate.content, true);
            let tagText = tag.querySelector('h4');
            tagText.innerHTML = tagName;
            tags.appendChild(tag);
        }

        console.log(articleInfo);
        if (articleInfo['is_poll']) {
            title.innerHTML = "Crowd-Sourced Analysis";
            pollPublic.classList.remove('d-none');
            pollExpert.classList.remove('d-none');
            truth.classList.add('d-none');

            let publicRatio = articleInfo['average_score'];
            var publicTrueString = publicTrueBar.innerText = `${(100 * (publicRatio)).toFixed(1)}%`;
            var publicFalseString = publicFalseBar.innerText = `${(100 * (1 - publicRatio)).toFixed(1)}%`;
            publicTrueBar.style.width = publicTrueString;
            publicFalseBar.style.width = publicFalseString;
            if (publicRatio <= 0.5) {
                publicFalseBar.classList.add("progress-bar-animated", "progress-bar-striped");
                publicTrueBar.classList.remove("progress-bar-animated", "progress-bar-striped");
            } else {
                publicFalseBar.classList.remove("progress-bar-animated", "progress-bar-striped");
                publicTrueBar.classList.add("progress-bar-animated", "progress-bar-striped");
            }

            let expertRatio = articleInfo['weighted_average_score'];
            var expertTrueString = expertTrueBar.innerText = `${(100 * (expertRatio)).toFixed(1)}%`;
            var expertFalseString = expertFalseBar.innerText = `${(100 * (1 - expertRatio)).toFixed(1)}%`;
            expertTrueBar.style.width = expertTrueString;
            expertFalseBar.style.width = expertFalseString;
            if (expertRatio <= 0.5) {
                expertFalseBar.classList.add("progress-bar-animated", "progress-bar-striped");
                expertTrueBar.classList.remove("progress-bar-animated", "progress-bar-striped");
            } else {
                expertFalseBar.classList.remove("progress-bar-animated", "progress-bar-striped");
                expertTrueBar.classList.add("progress-bar-animated", "progress-bar-striped");
            }
        } else {
            title.innerHTML = "Article Analysis";
            pollPublic.classList.add('d-none');
            pollExpert.classList.add('d-none');
            truth.classList.remove('d-none');

            if (articleInfo['truth_value']) {
                truth_value.classList.add('badge-success');
                truth_value.innerText = 'True';
            } else {
                truth_value.classList.add('badge-danger');
                truth_value.innerText = 'False';
            }

            if (articleInfo['rating']) {
                rating.innerText = articleInfo['rating'];
                rating.classList.add(articleInfo['truth_value'] ? 'badge-success' : 'badge-warning');
                rating.classList.remove('badge-light');
            }
        }
    });
});
