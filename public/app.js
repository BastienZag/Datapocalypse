const prodApiUrl = 'https://us-central1-datapocalypse-c3889.cloudfunctions.net';
const localApiUrl = 'http://localhost:5003/datapocalypse-c3889/us-central1';
const apiUrl = (location.hostname === "localhost" || location.hostname === "127.0.0.1") ? localApiUrl : prodApiUrl;

let selectedSuburb;
(function getSuburbs() {

    $.get(apiUrl + '/getSuburbs', function(data) {
        initSuburbsDropdown(data);
    });

    function initSuburbsDropdown(suburbs) {
        // add a button for each suburb into the dropdown
        let buttons = '';
        for (var i = 1; i < suburbs.length; i++) {
            buttons = buttons + createSuburbButton(suburbs[i], i);
        }
        $('.suburb-dropdown .dropdown-menu').append(buttons);
        // add clic event
        addClicEvent(arguments);
    }

    function addClicEvent() {
        // Replace the text from the Dropdown when select an item
        $(".suburb-dropdown .dropdown-menu button").click(function() {
            $(".suburb-dropdown .btn:first-child").text($(this).text());
            $(".suburb-dropdown .btn:first-child").val($(this).text());
            selectedSuburb = {
                name: $(arguments[0].target).html(),
                id: $(arguments[0].target).data('index')
            };
        });
    }

    function createSuburbButton(suburbName, index) {
        return '<button class="dropdown-item" data-index="' + index + '">' + suburbName + '</button>'
    };

})();

let survivalData;

// submit event
$('.calculate-survival').click(getSurvivalData);

function getSurvivalData() {
    // todo: get selectedScenario and selectedAge from dropdown
    const selectedScenario = 'Zombie Attack';
    const selectedAge = '18 to 24';

    const params = {
        suburb: selectedSuburb,
        age: selectedAge,
        scenario: selectedScenario
    };

    console.log(params);

    $.post(apiUrl + '/getSurvivalData', params, function(data) {
        survivalData = data;
        console.log(data);

        // update map, table and display index
    });
}

function displayData() {

}