const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET, POST')
        .status(200);

    response.send("Hello from Firebase!");
});

exports.getSurvivalData = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET, POST')
        .status(200);

    let survivalData = {
        index: 1.1
    };
    response.send(survivalData);
});