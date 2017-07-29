const functions = require('firebase-functions');
const $ = require("jquery");
const populationJSON = require('./population.json');

function CROSS(request, response) {
    response.set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET, POST')
        .status(200);
}

exports.getSurvivalData = functions.https.onRequest((request, response) => {
    CROSS(request, response);

    const age = request.body.age;
    const suburb = request.body.suburb.name;
    const scenario = request.body.scenario;
    const suburbData = populationJSON[request.body.suburb.id];

    // let index = 1.1;

    let X, Y;
    let weights = [];
    if (scenario === 'Zombie Attack') {
        weights = [1, 2, 3, 4, 5, 6];
    } else if (scenario === 'Fire Break Out') {
        weights = [6, 5, 4, 3, 2, 1];
    } else {
        weights = [3, 4, 5, 6, 7, 8];
    }

    // calculate index
    let index = 1.1;

    let survivalData = {
        index,
        suburb: suburbData,
        params: request.body
    };
    response.send(survivalData);
});


exports.getSuburbs = functions.https.onRequest((request, response) => {
    CROSS(request, response);

    let suburbs = [];
    for (var i = 0; i < populationJSON.length; i++) {
        suburbs.push(populationJSON[i].Suburb);
    }

    response.send(suburbs);
});