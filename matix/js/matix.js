$(document).ready(function () {
    run();
});

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function run() {
    let lineIds = [];

    console.log(lineIds);
    let i = -1;
    let fillStatusCount = 1;
    let fill = false;
    do {
        i++;
        fillStatusCount--;
        createLine(i, fill);
        lineIds.push("line-" + i);

        if(fillStatusCount === 0) {
            if(fill === true) {
                fill = false;
            }
            else {
                fill = true;
            }
            // How many Lines should be filled or not?
            fillStatusCount = Math.floor(Math.random()*5)+1;
            console.log(fillStatusCount);
        }
        console.log(fill);
    }
    while ($("#line-" + i).visible(true));

    console.log(lineIds);


    for (let j = 1000; 0 < j; j--) {
        $.each( lineIds, function(key, lineId) {
            $("#" + lineId).css("bottom", j/10 + "%")
        });
        await Sleep(10);
    }

    for (let j = 0; j < 1000; j++) {
        $.each( lineIds, function(key, lineId) {
            $("#" + lineId).css("bottom", "-" + j/10 + "%")
        });
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


function createLine(id, fill) {
    $("#matrix").append("            <div class=\"line\" id=\"line-" + id + "\">\n" +
        "                <div class=\"innerLine\" id=\"innerLine-" +  id + "\"></div>\n" +
        "            </div>");
    if(fill === true) {
        fillLine("innerLine-" + id);
    }
    else {
        $("#" + "innerLine-" + id).append("<div class='elements' style='visibility: hidden'>" + randChar() + "</div>");
    }
}

function fillLine(id) {
    //chars
    var numberOfElements = Math.floor(Math.random()*60)+10;
    for (let j = 0; j < numberOfElements; j++) {
        $("#" + id).append("<div class='elements'>" + randChar() + "</div>");
    }

    $("#" + id).css("border-bottom",  Math.floor(Math.random()*60) + "px solid transparent");

    //empty divs
}