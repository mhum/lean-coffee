var minute_offset = 5; 

$(function() { 
    //Set the clock and pause it so the time is visible
    setCountdown();
    $('#countdown-clock').countdown('pause');

    $(".editable-clock").editable({
        placement: 'left',
        title: 'Set Minutes',  
        mode: 'inline',
        showbuttons: true,
        send: 'never'
    });

    $(".editable-clock").on('save', function(e,params) {
        var newValue = params.newValue;
        
        var regex = /(\d{2}):(\d{2})/;
        var timeArray = regex.exec(newValue); 
        minute_offset = parseInt(timeArray[1]);
        
        var d = new Date();
        d.setSeconds(d.getSeconds() + parseInt(timeArray[2]));
        d.setMinutes(d.getMinutes() + parseInt(timeArray[1]));
        setTime(d);

        $('#countdown-clock').countdown('pause');
    });

	$("#start-timer").click(clickStart);
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
}

function setCountdown() {
	var d = new Date();
	d.setMinutes(d.getMinutes() + minute_offset);
	setTime(d);
}

function startCountdown() {
    //Start clock
    setCountdown();
    
    //Update text
    $("#start-timer").text('Pause');
    
    //Update state
    $('#countdown-clock').removeClass('not-started')
    $('#countdown-clock').addClass('running');
}

function pauseCountdown() {
    //Pause clock
    $('#countdown-clock').countdown('pause');
    
    //Update text
    $("#start-timer").text('Resume');
   
    //Update state
    $('#countdown-clock').removeClass('running')
    $('#countdown-clock').addClass('paused');
}

function resumeCountdown() {
    //Determine new end time
    var time_left = $('#countdown-clock').text();
    console.log($('#countdown-clock'))
    var regex = /(\d{2}):(\d{2})/;
    var timeArray = regex.exec(time_left); 
    
    var d = new Date();
    d.setSeconds(d.getSeconds() + parseInt(timeArray[2]));
    d.setMinutes(d.getMinutes() + parseInt(timeArray[1]));
   
    //Resume clock
    setTime(d);
    
    //Update text
    $("#start-timer").text('Pause');
    
    //Update state
    $('#countdown-clock').removeClass('paused')
    $('#countdown-clock').addClass('running');
}

function setTime(time){
    $('#countdown-clock').countdown($.format.date(time,'yyyy/MM/dd HH:mm:ss'), function(event) {
        $('#countdown-clock').html(event.strftime('%M:%S'));
    });
}