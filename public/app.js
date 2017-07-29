// Replace the text from the Dropdown when select an item
$(".suburb-dropdown .dropdown-menu button").click(function() {
    $(".suburb-dropdown .btn:first-child").text($(this).text());
    $(".suburb-dropdown .btn:first-child").val($(this).text());
});