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
    let truncI = 0;

    while(i < 10000) {
        if(resume.prop('checked')) {

            // Restart the timer
            if(start === 0) {
                start = performance.now();
            }

            // Remove old progress class, so you can add the new class in the next step
            bar.removeClass("bar-" + truncI);

            i++;
            truncI =  Math.trunc(i/10);

            updateInfo(i, fact(i));

            bar.addClass("bar-" + truncI);

            if((i/100)%5 === 0) {
                timeSum += calcTime(start, performance.now());
                start = performance.now();
                updateTime(i,(i/100), timeSum);
            }

            updatePercents(truncI);

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
    updateTweetText(timeSum);
    $(".controls").hide();

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
    const timeText = getTimeText(ms);
    $(".time").text("It took " + timeText + " to reach " + i +"! (" + percent + "%)");
}

function getTimeText(ms) {
    const seconds = Math.round(ms/10)/100;
    if(seconds < 60) {
        return seconds + " seconds";
    }
    else {
        const remainderSeconds = Math.round((seconds%60)*100)/100;
        const minutes = Math.round((seconds-(seconds%60))/60);

        if(remainderSeconds === 0) {
            return minutes + " minutes";
        }
        else {
            return minutes + " minutes and " + remainderSeconds + " seconds";
        }
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

/*
 * Update the text for the tweet button
 */
function updateTweetText(ms) {
    const twitterDiv = $('#twitter');
    let template = $('#tweetBtnTemplate').clone();

    twitterDiv.empty();
    //unhide
    template.removeAttr("style");
    template.attr("data-url", document.URL);
    template.attr("data-text", "It took my browser " + getTimeText(ms) + " to calculate every factorial from 0! to 10000! How fast is your browser on your PC? Check it here:");
    template.attr("class", "twitter-share-button");
    twitterDiv.append(template);

    // Trigger the render of the button
    $.getScript("http://platform.twitter.com/widgets.js");

    twitterDiv.show();
}