$(document).ready(function () {
    run();
});

function run() {
    $("#body").append("<div id='1'>x</div>");
    $("#body").append("<div id='2'>y</div>");



    for (let j = 0; j < 900; j++) {
        $("#1").css("margin-top", j/10 + "%");
    }
}