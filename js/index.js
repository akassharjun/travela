$(function () {
    const availableDestinations = [
        "The Alps",
        "Europe",
        "Africa",
        "The Caribbean",
        "Indian Ocean",
        "North America",
        "Central America",
        "South America",
        "Asia",
    ];
    $("#destination").autocomplete({
        source: availableDestinations
    });
});

$(function () {
    $("#start-date").datepicker();
    $("#end-date").datepicker();
});