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
    const bar = $(".bar");
    const resume = $("#resume");
    let i = 0;


    let start = performance.now();
    let timeSum = 0;

    while(i < 10000) {
        if(resume.prop('checked')) {

            // Restart the timer
            if(start === 0) {
                start = performance.now();
            }

            // Remove old progress class, so you can add the new class in the next step
            bar.removeClass("bar-" + Math.trunc(i/10));

            i++;

            updateInfo(i, fact(i));

            bar.addClass("bar-" + Math.trunc(i/10));

            if((i/100)%5 === 0) {
                timeSum += calcTime(start, performance.now());
                start = performance.now();
                updateTime(i,(i/100), timeSum);
            }
        }
        else {
            // Stop the timer
            if(start !== 0) {
                timeSum += calcTime(start, performance.now());
                start = 0;
            }
        }

        //Without this await for promise the browser just hangs
        await Sleep(0);
    }

    if(start != 0) {
        timeSum += calcTime(start, performance.now());
    }

    updateTime(i,100, timeSum);

}

/*
 * Update the text that shows the results
 */
function updateInfo(iterator, faculty) {
    $(".info").text("Factorial of " + iterator +  " is " + faculty);
}

/*
    Calculate the time
 */
function calcTime(start, end) {
    return (end - start);
}

/*
    Update the displayed time
 */
function updateTime(i, percent, ms) {
    const seconds = Math.round(ms/10)/100;
    if(seconds < 60) {
        $(".time").text("It took " + seconds + " seconds to reach " + i +"! (" + percent + "%)");
    }
    else {
        const remainderSeconds = Math.round((seconds%60)*100)/100;
        const minutes = Math.round((seconds-(seconds%60))/60);

        if(remainderSeconds === 0) {
            $(".time").text("It took " + minutes + " minutes to reach " + i +"! (" + percent + "%)");
        }
        else {
            $(".time").text("It took " + minutes + " minutes and " + remainderSeconds + " seconds to reach " + i +"! (" + percent + "%)");

        }
    }
}

