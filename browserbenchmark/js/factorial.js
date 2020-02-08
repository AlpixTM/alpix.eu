$(document).ready(function () {
    run();
});

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/*
    This method returns the factorial of the number n as String
 */
function fact(n) {
    if(n >= 0) {
        let factorial = new bigInt(1);
        while(n > 0) {
            factorial = factorial.times(n);
            n--;
        }

        return factorial.toString();
    }
    else {
        return "Bad value for n: " + n;
    }

}

async function run() {
    let colId = 1;
    const bar = $(".bar");
    const resume = $("#resume");
    let i = 0;


    let start = performance.now();
    let timeSum = 0;

    while(i < 10000) {
        if(resume.prop('checked')) {

    while(true) {
        while(resume.prop('checked')) {
            // Remove old progress class, so you can add the new class in the next step
            bar.removeClass("bar-" + Math.trunc(i/10));

            i++;

            updateInfo(i, fact(i));

                bar.addClass("bar-" + Math.trunc(i/10));
                //Without this await for promise the browser just hangs
                await Sleep(0);
            }
        }

        //Without this await for promise the browser just hangs
        await Sleep(0);
    }

    }
}

/*
 * Update the text that shows the results
 */
function updateInfo(iterator, faculty) {
    $(".info").text("Factorial of " + iterator +  " is " + faculty);
}

