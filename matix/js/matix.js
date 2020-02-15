$(document).ready(function () {
    run();
});

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function run() {
    $(".site").append("<div id='1' class='test'>x</div>");
    $(".site").append("<div id='2' class='test'>y</div>");



    for (let j = 0; j < 1000; j++) {
        $("#1").css("top", j/10 + "%");
        $("#2").css("top", j/10 + "%");
        await Sleep(10);
    }

}