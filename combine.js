const http = require('http');

function callAPI(id) {
    return new Promise((resolve, reject) => {
        const options = {
            host: 'example.com',
            path: '/q/result/' + id
        };

        http.get(options, (res) => {
            let body = [];
            res.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                resolve(body);
            }).on('error', reject);
        });
    });
}

function combine(inputs) {
    return Promise.all(inputs.map(input => callAPI(input.id)))
        // completed array of bodies
        // console.log(combined);
        // foo(combined.length, [...args]);
        ;
}

combine([1, 2]).then((combine) => {
    console.log(combine)
}).catch((error) => {
        console.log(error)
    }
);

