// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

const API_ROOT = "http://fakerinos.herokuapp.com/api/";

function fetchDomains() {
    let xmlhttp = new XMLHttpRequest();
    const domain_endpoint = API_ROOT + "articles/domain/";
    xmlhttp.open("GET", domain_endpoint, true);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            const domains = JSON.parse(xmlhttp.responseText);
            chrome.storage.sync.set({domains: domains});
            console.log(domains.toString());
        }
    };
    xmlhttp.send();
}

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({color: '#3aa757'}, function () {
        console.log("The color is green.");
    });
    fetchDomains();
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    // pageUrl: {hostEquals: '*'},
                })
            ],
            actions: [
                new chrome.declarativeContent.ShowPageAction(),
            ]
        }]);
    });
});
