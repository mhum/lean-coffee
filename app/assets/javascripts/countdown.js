$(function() {
    $('#countdown-clock').countdown('', function(event) {
		$(this).html(event.strftime('%M:%S'));
	});

	$("#start-timer").click(function () {
        if ($('#countdown-clock').hasClass('not-started')) {
            start_countdown();
        } else if ($('#countdown-clock').hasClass('running')) {
            pause_countdown();
        } else if ($('#countdown-clock').hasClass('paused')) {
            resume_countdown();
        }
    });

	$("#reset-timer").click(function () {
        //Restart clock
 		set_countdown();
        
        //Pause Clock
 		$('#countdown-clock').countdown('pause');
        
        //Update Text
 		$("#start-timer").text('Start');
        
        //Update state
        $('#countdown-clock').addClass('not-started');
    });
});

function set_countdown() {
	var d = new Date();
	d.setMinutes(d.getMinutes() + 5);
	$('#countdown-clock').countdown($.format.date(d,'yyyy/MM/dd HH:mm:ss'), function(event) {
		$('#countdown-clock').html(event.strftime('%M:%S'));
	});
}

function start_countdown() {
    //Start clock
    set_countdown();
    
    //Update text
    $("#start-timer").text('Pause');
    
    //Update state
    $('#countdown-clock').removeClass('not-started')
    $('#countdown-clock').addClass('running');
}

function pause_countdown() {
    //Pause clock
    $('#countdown-clock').countdown('pause');
    
    //Update text
    $("#start-timer").text('Resume');
   
    //Update state
    $('#countdown-clock').removeClass('running')
    $('#countdown-clock').addClass('paused');
}

function resume_countdown() {
    //Determine new end time
    var time_left = $('#countdown-clock').text();
    var regex = /(\d{2}):(\d{2})/;
    var timeArray = regex.exec(time_left); 
    
    var d = new Date();
    d.setSeconds(d.getSeconds() + parseInt(timeArray[2]));
    d.setMinutes(d.getMinutes() + parseInt(timeArray[1]));
   
    //Resume clock
    $('#countdown-clock').countdown($.format.date(d,'yyyy/MM/dd HH:mm:ss'), function(event) {
        $('#countdown-clock').html(event.strftime('%M:%S'));
    });
    
    //Update text
    $("#start-timer").text('Pause');
    
    //Update state
    $('#countdown-clock').removeClass('paused')
    $('#countdown-clock').addClass('running');
}