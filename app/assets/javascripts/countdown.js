$(function() {
    //Get timer information and set time left
    var session_id = $(".topic-area").data("id");
    if (session_id) {
        $.get( "/timer/"+session_id+"/status", function(data) {
            setTime(data.timer_end_time)

            //Set correct buttons
            updateTimerBtns(data.timer_status)

            //Puase timer if needed
            if (data.timer_status != 'start') {
            	$('#countdown-clock').countdown('pause');
            }
        });
    }

    //Make clock editable
    $(".editable-clock").editable({
        placement: 'left',
        mode: 'inline',
        showbuttons: true,
        send: 'never',
        validate: validateTime,
        value: '00:00',
        unsavedclass: ''
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
	var session_id = $(".topic-area").data("id");
	$.post( "/timer/"+session_id+"/start");
    updateTimerBtns('start');
}

function pauseCountdown() {
    var session_id = $(".topic-area").data("id");
	$.post( "/timer/"+session_id+"/pause");
    updateTimerBtns('pause');
}

function resumeCountdown() {
    var session_id = $(".topic-area").data("id");
	$.post( "/timer/"+session_id+"/resume");
    updateTimerBtns('resume');
}

function clickRestart() {
    var session_id = $(".topic-area").data("id");
	$.post( "/timer/"+session_id+"/reset")
    updateTimerBtns('reset');
}

function updateTimerBtns(event) {
    switch(event) {
        case 'start':
            //Update text
            $("#start-timer span.text").text('Pause');

            //Update Icon
            $("#start-timer span.glyphicon").removeClass('glyphicon-play');
            $("#start-timer span.glyphicon").addClass('glyphicon-pause');

            //Update state
            $('#countdown-clock').removeClass('not-started');
            $('#countdown-clock').addClass('running');
            break;
        case 'pause':
            //Update text
            $("#start-timer span.text").text('Resume');

            //Update Icon
            $("#start-timer span.glyphicon").addClass('glyphicon-play');
            $("#start-timer span.glyphicon").removeClass('glyphicon-pause');

            //Update state
            $('#countdown-clock').removeClass('not-started');
            $('#countdown-clock').removeClass('running');
            $('#countdown-clock').addClass('paused');
            break;
        case 'resume':
            //Update text
            $("#start-timer span.text").text('Pause');

            //Update Icon
            $("#start-timer span.glyphicon").removeClass('glyphicon-play');
            $("#start-timer span.glyphicon").addClass('glyphicon-pause');

            //Update state
            $('#countdown-clock').removeClass('paused');
            $('#countdown-clock').addClass('running');
            break;
        case 'reset':
            //Update Text
            $("#start-timer span.text").text('Start');

            //Update Icon
            $("#start-timer span.glyphicon").addClass('glyphicon-play');
            $("#start-timer span.glyphicon").removeClass('glyphicon-pause');

            //Update state
            $('#countdown-clock').addClass('not-started');
            $('#countdown-clock').removeClass('running');
            $('#countdown-clock').removeClass('paused');

            //Remove countdown flasher
            $('body').removeClass('flash');
    }
}

function changeTime(e, params) {
    var newValue = params.newValue;
    var session_id = $(".topic-area").data("id");
    $.post( "/timer/"+session_id+"/update", {'time':newValue});

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