var fs = require("fs");
var https = require("https");

var options = {
    host: "en.wikipedia.org",
    path: "/wiki/George_Washington1",
    port: 443,
    method: "GET"
};

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
    console.log(message)
}).catch((err) => {
    console.log(err)
});

