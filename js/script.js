$(document).ready(function () {
    run();
});

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function run() {
    var colId = 1;
    var bar = $(".bar");
    var resume = $("#resume");
    var i = 1001;

    while(true) {
        while(resume.prop('checked')) {
            // Remove old progress class, so you can add the new class in the next step
            bar.removeClass("bar-" + i);

            //if its at the end reset it
            //else just let it grow further
            if (i > 1000) {
                await Sleep(500);
                i = 0;
                bar.removeClass("bar-0");
                bar.addClass("bar-" + (i));
                updatePercents(i);
                $("." + colId).prop('checked', true);
                colId += 1;
                if (colId > 3) {
                    colId = 1;
                }
                await Sleep(500);
            }
            else {
                // Make the progress appear random
                i += Math.floor(Math.random() * Math.floor(Math.random() * 25));
                bar.addClass("bar-" + (i));
                await Sleep(50 + Math.floor(Math.random() * + Math.floor(Math.random() * 10) * Math.random() * Math.floor(Math.random() * 10) * Math.random() * Math.floor(Math.random() * 10) * Math.random()));
            }

            updatePercents(i);
        }

        await Sleep(10);
    }
}

/*
 * Update the text that shows the progress in percent
 */
function updatePercents(iterator) {
    iterator /= 10;

    // Max 100%
    if(iterator > 100) {
        iterator = 100;
    }

    $(".percent").text(iterator + "%");
}