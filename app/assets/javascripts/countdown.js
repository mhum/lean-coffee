$(function() { 
    //Get timer information and set time left
    $.get( "/timer/status", function(data) {
        console.log(data)
        setTime(data.timer_end_time)

        //Pause if not running
        if (!data.timer_running) {
            $('#countdown-clock').countdown('pause');
        }
    });

    //Make clock editable
    $(".editable-clock").editable({
        placement: 'left', 
        mode: 'inline',
        showbuttons: true,
        send: 'never',
        validate: validateTime,
        value: '00:00'
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

function startCountdown() {
    dispatcher.trigger('start_timer');
    updateTimerBtns('start');  
}

function pauseCountdown() {
    dispatcher.trigger('pause_timer');
    updateTimerBtns('pause');  
}

function resumeCountdown() {
    dispatcher.trigger('resume_timer');
    updateTimerBtns('resume'); 
}

function clickRestart() {
    dispatcher.trigger('reset_timer');
    updateTimerBtns('reset'); 
}

function updateTimerBtns(event) {
    switch(event) {
        case 'start':
            //Update text
            $("#start-timer").text('Pause');
            
            //Update state
            $('#countdown-clock').removeClass('not-started');
            $('#countdown-clock').addClass('running');
            break;
        case 'pause':   
            //Update text
            $("#start-timer").text('Resume');
           
            //Update state
            $('#countdown-clock').removeClass('running');
            $('#countdown-clock').addClass('paused');
            break;
        case 'resume':
            //Update text
            $("#start-timer").text('Pause');
            
            //Update state
            $('#countdown-clock').removeClass('paused');
            $('#countdown-clock').addClass('running');
            break;
        case 'reset':
            //Update Text
            $("#start-timer").text('Start');
            
            //Update state
            $('#countdown-clock').addClass('not-started');
            $('#countdown-clock').removeClass('running');
            $('#countdown-clock').removeClass('paused');

            //Remove countdown flasher
            $('body').removeClass('flash'); 
    }
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
    $('#countdown-clock').countdown(time, function(event) {
        $('#countdown-clock').html(event.strftime('%M:%S'));
        $(".editable-clock").editable('setValue', event.strftime('%M:%S'), true);
    });
}