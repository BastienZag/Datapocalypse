const apiUrl = 'https://us-central1-datapocalypse-c3889.cloudfunctions.net/';
const apiCSV = '';

function getSurvivalData() {
    $.get(apiUrl + '/getSurvivalData', function(data) {
        // $(".result").html(data);
        console.log("Survival Rate: " + data.index);
    });
}

function displayData() {

}

let populationData;
let selectedSuburb;

(function getSuburbs() {

    $.get(apiUrl + '/getSuburbs', function(data) {
        initSuburbsDropdown(data);
    });

    function initSuburbsDropdown(popData) {
        populationData = popData;
        let buttons = '';
        for (var i = 1; i < popData.length; i++) {
            buttons = buttons + createSuburbButton(popData[i], i);
        }
        $('.suburb-dropdown .dropdown-menu').append(buttons);

        // Replace the text from the Dropdown when select an item
        $(".suburb-dropdown .dropdown-menu button").click(function() {
            $(".suburb-dropdown .btn:first-child").text($(this).text());
            $(".suburb-dropdown .btn:first-child").val($(this).text());
            selectedSuburb = populationData[$(arguments[0].target).data('index')];
            // update map

            // updatemap(selectedPopulationData[0], selectedPopulationData[1]);
        });
    }

    function createSuburbButton(suburbName, index) {
        return '<button class="dropdown-item" data-index="' + index + '">' + suburbName + '</button>'
    };

})();