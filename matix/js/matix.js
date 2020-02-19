$(document).ready(function () {
    run();
});

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function run() {
    var lineIds = [""];

    console.log(lineIds);
    let i = -1;
    do {
        i++;
        createLine(i);
    }
    while ($("#line-" + i).visible(true));

    for (let j = 1000; 0 < j; j--) {
        $("#line-1").css("bottom", j/10 + "%");
        $("#line-2").css("bottom", j/10 + "%");
        await Sleep(15);
    }

    for (let j = 0; j < 1000; j++) {
        $("#line-1").css("bottom", "-" + j/10 + "%");
        $("#line-2").css("bottom", "-" + j/10 + "%");

        await Sleep(15);
    }

}

function randChar() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    result = characters.charAt(Math.floor(Math.random()*charactersLength));

    return result;
}


function createLine(id) {
    $("#matrix").append("            <div class=\"line\" id=\"line-" + id + "\">\n" +
        "                <div class=\"innerLine\" id=\"innerLine-" +  id + "\"></div>\n" +
        "            </div>")
    fillLine("innerLine-" + id);
}

function fillLine(id) {
    //chars
    var numberOfElements = Math.floor(Math.random()*50)+10;
    for (let j = 0; j < numberOfElements; j++) {
        $("#" + id).append("<div class='elements'>" + randChar() + "</div>");
    }

    $("#" + id).css("border-bottom",  Math.floor(Math.random()*50) + "px solid transparent");

    //empty divs
}