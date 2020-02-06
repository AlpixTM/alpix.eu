$(document).ready(function () {
    run();
});

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function fact(n) {
    let factorial = new bigInt(1);
    while(n > 0) {
        factorial = factorial.times(n);
        n--;
    }

    return factorial.toString();
}

async function run() {
    let colId = 1;
    const bar = $(".bar");
    const resume = $("#resume");
    let i = 10001;

    while(true) {
        while(resume.prop('checked')) {
            // Remove old progress class, so you can add the new class in the next step
            bar.removeClass("bar-" + Math.trunc(i/10));

            //if its at the end reset it
            //else just let it grow further
            if (i >= 10000) {
                await Sleep(500);
                i = 0;
                bar.addClass("bar-0");
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

                bar.addClass("bar-" + Math.trunc(i/10));
                //Without this await for promise the browser just hangs
                await Sleep(0);
            }
        }

        //Without this await for promise the browser just hangs
        await Sleep(0);

    }
}

/*
 * Update the text that shows the results
 */
function updatePercents(iterator, faculty) {
    $(".info").text("Factorial of " + iterator +  " is " + faculty);
}

