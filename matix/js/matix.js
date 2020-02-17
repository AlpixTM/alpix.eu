$(document).ready(function () {
    run();
});

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function run() {
    var lineIds = ["line-1"];

    var numberOfElements = Math.floor(Math.random()*40)+10;
    for (let j = 0; j < numberOfElements; j++) {
        $("#line-1").append("<div class=''>" + randChar() + "</div>");
    }


    for (let j = 1000; 0 < j; j--) {
        $("#line-1").css("bottom", j/10 + "%");
        await Sleep(10);
    }

    $("#line-1").removeAttr("style");

    for (let j = 0; j < 1000; j++) {
        $("#line-1").css("top", j/10 + "%");
        await Sleep(10);
    }

}

function randChar() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    result = characters.charAt(Math.floor(Math.random()*charactersLength));

    return result;
}