var fs = require("fs");
var https = require("https");
const uri = require('url');
const request = require('request-promise');
const url = 'https://api.github.com/users';
const ua = 'Mozilla/5.0 (Windows NT 6.1; rv:14.0) Gecko/20120405 Firefox/14.0a1';

var options = {
    // host: "en.wikipedia.org",
    host: uri.parse(url).host,
    // path: "/wiki/George_Washington",
    path: uri.parse(url).pathname,
    port: 443,
    method: "GET",
    params: "optikalefx",
    headers: {
        'User-Agent': ua
    }
};

let promise = async function main() {
    try {
        const res = await request.get({
            url: `${url}/optikalefx`, method: 'GET', headers: {
                'User-Agent': ua
            }
        });
        return res;
    } catch (e) {
        console.log(e);
    }
};

promise().then((message) => console.log(message));
const getData = (callback) => {

    var req = https.request(options, function (res) {
        console.log(res.statusCode);
        res.setEncoding('utf8');
        var chunk1 = "";

        res.on('data', function (chunk) {
            chunk1 += chunk;
            // console.log(chunk);
        });

        res.on('end', function () {
            callback(res.statusCode, chunk1);
        });

    });
    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
};

new Promise((resolve, reject) => {
    getData((status, body) => {
        if (status !== 200) reject("Exception");
        else resolve(body);
    })
}).then((message) => {
    // console.log(message)
}).catch((err) => {
    console.log(err)
});

