let timeobj = {
    minutes : 0,
    seconds : 0,
    timerId : 0
}

function soundAlarm() {
    let amount = 3;
    let audio = new Audio("Timer_Sound_Effect.mp3");

    function playsound() {
        audio.pause();
        audio.currentTime = 0;
        audio.play();

    }
    for (let i = 0; i < amount; i++) {
        setTimeout(playsound,1200*i);
    }
}


function updateValue(key,value) {
    if (value<0) {
        console.log("Invalid Input");
        value = 0 ;
    }
    if (key== "seconds") {
        if (value<10) {
            value="0"+value;
        }
        if (value>59) {
            value=59;
        }
    }
    $("#"+key).html(value||0);
    timeobj[key] = value;
}

(function detectChanges(key) {
    console.log("Detect changes")
    let input = "#" + key + "-input";
    $(input).change(function () {
        updateValue(key,$(input).val());
    })
    $(input).keyup(function () {
        updateValue(key,$(input).val());
    })
    return arguments.callee;
})("minutes")("seconds")


function buttonManager(...buttonsArray) {
    for (let i = 0; i < buttonsArray.length; i++) {
        let button = "#" + buttonsArray[i][0] + "-button";
        if (buttonsArray[i][1]) {
            $(button).removeAttr("disabled");
        } else {
            $(button).attr("disabled","disabled");
        }
    }
}

function startTimer() {
    buttonManager(["start",false],["stop",true],["pause",true]);
    freezeInputs();

    timeobj.timerId = setInterval(() => {
        timeobj.seconds--;
        if (timeobj.seconds<0) {
            if (timeobj.minutes==0) {
                soundAlarm();
                return stopTimer();
            } else{
                timeobj.seconds = 59;
                timeobj.minutes--;
            }
        }
        updateValue("minutes", timeobj.minutes);
        updateValue("seconds", timeobj.seconds);
    }, 1000);
}

function stopTimer() {
    clearInterval(timeobj.timerId);
    buttonManager(["start",true],["stop",false],["pause",false]);
    unfreezeInputs();
    updateValue("minutes",$("#minutes-input").val());
    updateValue("seconds",$("#seconds-input").val());
}

function pauseTimer() {
    clearInterval(timeobj.timerId);
    buttonManager(["start",true],["stop",true],["pause",false]);
    freezeInputs();
}

function freezeInputs() {
    $("#minutes-input").attr("disabled","disabled");
    $("#seconds-input").attr("disabled","disabled");
}

function unfreezeInputs() {
    $("#minutes-input").removeAttr("disabled");
    $("#seconds-input").removeAttr("disabled");
}
// Created by Pratik
