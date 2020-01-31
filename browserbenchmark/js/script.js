$(document).ready(function () {
    run();
});

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function fact(n) {
    let test = 1;
    while(n > 0) {
        test *= n;
        n--;
    }

    return test;
}

async function run() {
    let colId = 1;
    const bar = $(".bar");
    const resume = $("#resume");
    let i = 1001;

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
                updatePercents(i, fact(i));
            }
            else {
                i++;
                updatePercents(i, fact(i));

                bar.addClass("bar-" + (i));
                await Sleep(50);
            }
        }

        await Sleep(10);
    }
}

/*
 * Update the text that shows the progress in percent
 */
function updatePercents(iterator, faculty) {
    $(".percent").text("Faculty of " + iterator +  " is " + faculty);
}