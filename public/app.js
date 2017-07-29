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

var selectedScenario;
var selectedAge;
(function initAgeAndScenaioDropdown() {
    // todo: refactor this code
    var ageDropdownSelector = '.age-dropdown';
    $(ageDropdownSelector + " .dropdown-menu button").click(function() {
        $(ageDropdownSelector + " .btn:first-child").text($(this).text());
        $(ageDropdownSelector + ".btn:first-child").val($(this).text());
        selectedAge = $(arguments[0].target).html();
    });
    var scenarioDropdownSelector = '.scenario-dropdown';
    $(scenarioDropdownSelector + " .dropdown-menu button").click(function() {
        $(scenarioDropdownSelector + " .btn:first-child").text($(this).text());
        $(scenarioDropdownSelector + ".btn:first-child").val($(this).text());
        selectedScenario = $(arguments[0].target).html();
    });
})();

var survivalData;
// submit event
$('.calculate-survival').click(getSurvivalData);

function getSurvivalData() {

    // check if the user has selected all params
    if (!selectedSuburb || !selectedAge || !selectedScenario) {
        $('.error-message').html('You need to select a Suburb, age bracket and a scenario.').show();
    } else {
        $('.error-message').hide();

        const params = {
            suburb: selectedSuburb,
            age: selectedAge,
            scenario: selectedScenario
        };
        $.post(apiUrl + '/getSurvivalData', params, function(data) {
            survivalData = data;
            console.log(data);
            // update map, table and display index
            displayIndex(data);
        });
    }
}

function displayIndex(data) {
    $('.survival-index-number').html(data.index);
    $('.survival-index').show();
    showHighchartData();
    $('.highchart').show();
}

function showHighchartData() {
    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Browser<br>shares<br>2015',
            align: 'center',
            verticalAlign: 'middle',
            y: 40
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            innerSize: '50%',
            data: [
                ['Firefox', 10.38],
                ['IE', 56.33],
                ['Chrome', 24.03],
                ['Safari', 4.77],
                ['Opera', 0.91],
                {
                    name: 'Proprietary or Undetectable',
                    y: 0.2,
                    dataLabels: {
                        enabled: false
                    }
                }
            ]
        }]
    });
}