const functions = require('firebase-functions');
const populationJSON = require('./population_small.json');
const firebase = require('firebase');

function CROSS(request, response) {
    response.set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET, POST')
        .status(200);
}

var config = {
    apiKey: "AIzaSyB4nKrhYM1HLwxBxWhu68zZqQrJK9mJk4E",
    authDomain: "datapocalypse-c3889.firebaseapp.com",
    databaseURL: "https://datapocalypse-c3889.firebaseio.com",
    projectId: "datapocalypse-c3889",
    storageBucket: "datapocalypse-c3889.appspot.com",
    messagingSenderId: "482430616409"
};

exports.getSurvivalData = functions.https.onRequest((request, response) => {
    CROSS(request, response);

    const age = request.body.age;
    const suburb = request.body.suburb.name;
    const scenario = request.body.scenario;
    const suburbData = populationJSON[request.body.suburb.id];

    let survivalData;
    if (firebase.apps.length === 0) {
        firebase.initializeApp(config);
    }

    var db = firebase.database();
    var ref = db.ref('weights');
    return ref.once("value", function(snapshot) {

        var selectedWeight = snapshot.val()[scenario];

        const ageBuckets = {
            '1 - 12': 0.1,
            '13 - 20': 0.2,
            '21 - 35': 0.6,
            '36 - 49': 0.8,
            '50 - 60': 0.6,
            '61 - 70': 0.3,
            '71 - 90': 0.2,
            'above 90': 0.1
        };

        // calculate index
        let index = selectedWeight[0] * suburbData.Density_Norm +
            selectedWeight[1] * suburbData.Earthquake_Norm +
            selectedWeight[2] * suburbData.Income_Norm +
            selectedWeight[3] * ageBuckets[age] +
            selectedWeight[4] * suburbData.Hospital_Norm +
            selectedWeight[5] * suburbData.Water_Norm;

        survivalData = {
            index,
            suburb: suburbData,
            params: request.body
        };

        survivalData.gauge = {};
        if (selectedWeight[0] && selectedWeight[0] !== 0) {
            survivalData.gauge.density = selectedWeight[0] * suburbData.Density_Norm;
        }
        if (selectedWeight[1] && selectedWeight[1] !== 0) {
            survivalData.gauge.earthquake = selectedWeight[1] * suburbData.Earthquake_Norm;
        }
        if (selectedWeight[2] && selectedWeight[2] !== 0) {
            survivalData.gauge.income = selectedWeight[2] * suburbData.Income_Norm;
        }
        if (selectedWeight[3] && selectedWeight[3] !== 0) {
            survivalData.gauge.age = selectedWeight[3] * ageBuckets[age];
        }
        if (selectedWeight[4] && selectedWeight[4] !== 0) {
            survivalData.gauge.hospital = selectedWeight[4] * suburbData.Hospital_Norm;
        }
        if (selectedWeight[5] && selectedWeight[5] !== 0) {
            survivalData.gauge.water = selectedWeight[5] * suburbData.Water_Norm;
        }

        survivalData.weights = selectedWeight;

        response.status(200).json(survivalData);
    });
});

exports.getSuburbs = functions.https.onRequest((request, response) => {
    CROSS(request, response);

    let suburbs = [];
    for (var i = 0; i < populationJSON.length; i++) {
        suburbs.push(populationJSON[i].Suburb);
    }

    response.send(suburbs);
});