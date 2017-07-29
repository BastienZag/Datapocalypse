const functions = require('firebase-functions');
const $ = require("jquery");
const populationJSON = require('./population.json');

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


exports.getSuburbs = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET, POST')
        .status(200);

    let suburbs = [];
    for (var i = 0; i < populationJSON.length; i++) {
        suburbs.push(populationJSON[i].Suburb);
    }

    response.send(suburbs);
});