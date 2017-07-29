const apiUrl = 'https://us-central1-datapocalypse-c3889.cloudfunctions.net/';

// Replace the text from the Dropdown when select an item
$(".suburb-dropdown .dropdown-menu button").click(function() {
    $(".suburb-dropdown .btn:first-child").text($(this).text());
    $(".suburb-dropdown .btn:first-child").val($(this).text());
});


function getSurvivalData() {
    $.get(apiUrl + '/getSurvivalData', function(data) {
        // $(".result").html(data);
        console.log("Survival Rate: " + data.index);
    });
}

function displayData() {

}


(function getSuburbs() {

})();