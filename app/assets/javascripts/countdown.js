var minuteOffset = 5; 
var secondOffset = 0;

$(function() { 
    //Set the clock and pause it so the time is visible
    setCountdown();
    $('#countdown-clock').countdown('pause');

    $(".editable-clock").editable({
        placement: 'left',
        title: 'Set Minutes',  
        mode: 'inline',
        showbuttons: true,
        send: 'never',
        validate: validateTime
    });

    //Change timer
    $(".editable-clock")
        .on('save', changeTime)
        .on('finish.countdown', function(event) {
           
           $('body').addClass('flash');
           
           setTimeout(function(){
               $('body').removeClass('flash');
            }, 10000);
        });

    //Click Start/Resume button
	$("#start-timer").click(clickStart);

    //Click reset button
	$("#reset-timer").click(clickRestart);
});

function clickStart() {
    if ($('#countdown-clock').hasClass('not-started')) {
        startCountdown();
    } else if ($('#countdown-clock').hasClass('running')) {
        pauseCountdown();
    } else if ($('#countdown-clock').hasClass('paused')) {
        resumeCountdown();
    }
}

function clickRestart() {
    //Restart clock
    setCountdown();
    
    //Pause Clock
    $('#countdown-clock').countdown('pause');
    
    //Update Text
    $("#start-timer").text('Start');
    
    //Update state
    $('#countdown-clock').addClass('not-started');

    //Remove countdown flasher
    $('body').removeClass('flash'); 
}

function setCountdown() {
	var d = new Date();
    d.setSeconds(d.getSeconds() + secondOffset);
	d.setMinutes(d.getMinutes() + minuteOffset);
	setTime(d);
}

function startCountdown() {
    //Start clock
    setCountdown();
    
    //Update text
    $("#start-timer").text('Pause');
    
    //Update state
    $('#countdown-clock').removeClass('not-started');
    $('#countdown-clock').addClass('running');
}

function pauseCountdown() {
    //Pause clock
    $('#countdown-clock').countdown('pause');
    
    //Update text
    $("#start-timer").text('Resume');
   
    //Update state
    $('#countdown-clock').removeClass('running');
    $('#countdown-clock').addClass('paused');
}

function resumeCountdown() {
    //Determine new end time
    var timeLeft = $('#countdown-clock').text();
    var regex = /(\d{2}):(\d{2})/;
    var timeArray = regex.exec(timeLeft); 
    
    var d = new Date();
    d.setSeconds(d.getSeconds() + parseInt(timeArray[2]));
    d.setMinutes(d.getMinutes() + parseInt(timeArray[1]));
   
    //Resume clock
    setTime(d);
    
    //Update text
    $("#start-timer").text('Pause');
    
    //Update state
    $('#countdown-clock').removeClass('paused');
    $('#countdown-clock').addClass('running');
}

function changeTime(e, params) {
    //Reset statuses and buttons
    if ($('#countdown-clock').hasClass('running')) {
        $('#countdown-clock').removeClass('running');
        $('#countdown-clock').addClass('not-started');
        $("#start-timer").text('Start');
    } else if ($('#countdown-clock').hasClass('paused')) {
        $('#countdown-clock').removeClass('paused');
        $('#countdown-clock').addClass('not-started');
        $("#start-timer").text('Start');
    }

    var newValue = params.newValue;
    
    var regex = /(\d{2}):(\d{2})/;
    var timeArray = regex.exec(newValue); 

    secondOffset = parseInt(timeArray[2]);
    minuteOffset = parseInt(timeArray[1]);
    
    var d = new Date();
    d.setSeconds(d.getSeconds() + parseInt(timeArray[2]));
    d.setMinutes(d.getMinutes() + parseInt(timeArray[1]));
    setTime(d);

    $('#countdown-clock').countdown('pause');
}

function validateTime (value) {
    var regex = /(\d{2}):(\d{2})/;
    var timeArray = regex.exec(value);

    if (!timeArray) {
        return "Time format must be: mm:ss";
    }
}

function setTime(time){
    $('#countdown-clock').countdown($.format.date(time,'yyyy/MM/dd HH:mm:ss'), function(event) {
        $('#countdown-clock').html(event.strftime('%M:%S'));
    });
}