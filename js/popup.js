document.addEventListener('DOMContentLoaded', function () {
    let title = document.getElementById("title");
    let headline = document.getElementById("headline");
    let tags = document.getElementById("tags");
    let tagTemplate = document.querySelector("#tag-template");
    let poll = document.getElementById("poll");
    let weighted_true_ratio = document.getElementById("weighted-true-ratio");
    let weighted_false_ratio = document.getElementById("weighted-false-ratio");
    let truth = document.getElementById("truth");
    let truth_container = document.getElementById("truth-container");
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
            console.log(tag.innerHTML);
        }

        if (articleInfo['is_poll']) {
            title.innerHTML = "Crowd-Sourced Analysis";
            poll.classList.remove('d-none');
            truth.classList.add('d-none');
        } else {
            title.innerHTML = "Article Analysis";
            poll.classList.add('d-none');
            truth.classList.remove('d-none');

            if (articleInfo['truth_value']) {
                truth_value.classList.add('badge-success');
                truth_value.innerText = 'True';
            } else {
            }

            if (articleInfo['rating']) {
                rating.innerText = articleInfo['rating'];
            }
            switch (articleInfo['rating']) {
                case '':
                    rating.classList.add('badge-light');
                    break;
                case 'questionable':
                    rating.classList.add('badge-warning');
                    break;
                case 'pants on fire':
                    rating.classList.add('badge-danger');
                    break;
            }
        }
    });
});
