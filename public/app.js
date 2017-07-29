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
let selectedPopulationData;

(function getData() {

    $.get('/population_extract.csv', function(data) {
        // $(".result").html(data);
        // console.log("Population data: " + data);
        populationData = $.csv.toArrays(data);
        // console.log("Population data: " + populationData);
        initSuburbsDropdown(populationData);
    });

    function initSuburbsDropdown(popData) {
        for (var i = 1; i < popData.length; i++) {
            var button = createSuburbButton(popData[i][3], i);
            $('.suburb-dropdown .dropdown-menu').append(button);
        }

        // Replace the text from the Dropdown when select an item
        $(".suburb-dropdown .dropdown-menu button").click(function() {
            $(".suburb-dropdown .btn:first-child").text($(this).text());
            $(".suburb-dropdown .btn:first-child").val($(this).text());
            selectedPopulationData = populationData[$(arguments[0].target).data('index')];
            console.log(selectedPopulationData);

            // update map

           // updatemap(selectedPopulationData[0], selectedPopulationData[1]);
        });
    }

    function createSuburbButton(suburbName, index) {
        return '<button class="dropdown-item" data-index="' + index + '">' + suburbName + '</button>'
    };

})();
