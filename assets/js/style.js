$(document).ready(function () {
    $("#nav-container").fadeIn(300, function () {
        $("#hero-container").fadeIn(300, function () {
            $("#articles-container").fadeIn(300);
        })
        $("#hero-container").css("display", "flex");

    });
    $("#nav-container").css("display", "flex")
});