var state = true; //true = work false = play
var isPaused = true; //true timer started paused false timer start
var change = true; // var so timer only resets on click if a change has been made to work or play variable
var i = true; // timer state variable, so setinterval doesn't overlap

$(document).ready(function(){

	function time(minutes,seconds){
		if(state === true){
			var base = $(".work-span").html();
		} else if(state === false){
			var base = $(".play-span").html();
		}

		minutes = base%60 - 1
		
		
		seconds = 59;
		
		if(change){
			change = false;
			$("#title-filler").css("width", 0);
			return '<span class = "minutes">' + minutes + '</span>' + ":" + '<span class = "seconds">' + seconds + '</span>' ;
		}
	}
	$(".title").hover(function(){
		$(".red").html('<i class="fa fa-play-circle" aria-hidden="true"></i>')},
		function(){
		$(".red").html('o');
	});

	$(".button").on("click",function(){
		if(isPaused){
			change = true;
			if($(this).html() === "+"){
				if($(this).hasClass("work")) {
					var timer = $(".work-span").html();
					if(timer < 59){					
						timer++;
					}					
					$(".work-span").html(timer);
					$(".clock").html(timer);
				} else if($(this).hasClass("play")){
					var timer = $(".play-span").html();
					if(timer < 59){					
						timer++;
					}	
					$(".play-span").html(timer);
				}
			} else if($(this).html() === "-"){
				if($(this).hasClass("work")) {
					var timer = $(".work-span").html();
					if(timer > 1){
						timer--;
					}
					$(".work-span").html(timer);
					$(".clock").html(timer);
				} else if($(this).hasClass("play")){
					var timer = $(".play-span").html();
					if(timer > 1){
						timer--;
					}
					$(".play-span").html(timer);
				}
			}
		}
	})


	$(".title").on("click", function(e){
		e.preventDefault();
  		isPaused = !isPaused;
		var fillerWidth = 0;

		

		$(".clock").html(time());


		function timerStart(){
			var seconds = $(".seconds").html();
			var minutes = $(".minutes").html();
			var filler = $("#title-filler");
			if(state === true){
				var x = $(".work-span").html();
				var px = (308/(x*60));
			} else if( state === false){
				var x = $(".play-span").html();
				var px = (308/(x*60));
			}

			if(!isPaused){
				if(seconds > -1){
					seconds--;
					filler.css("width", function(){
						fillerWidth += px;
						return fillerWidth;
					});
					if(seconds === -1 && minutes > 0 ){
						seconds = 59;
						minutes--;
					}  
				} 
				if(seconds < 10){
					$(".seconds").html("0" + seconds);
				} else {
					$(".seconds").html(seconds);
				}
				$(".minutes").html(minutes);
			}
			if(Number(seconds) === 0 && Number(minutes) === 0) {
				if(state === true){
					state = false;
					change = true;
					filler.css("width", 0);
					filler.css("background-color", "rgba(245,50,41,.6)");
					fillerWidth = 0;
					$(".clock").html(time);
					$(".status").html("<span class = red1>Play</span>");
				} else if(state === false){
					state = true;
					change = true;
					filler.css("width", 0);
					filler.css("background-color", "rgba(0,164,120,.5)");
					fillerWidth = 0;
					$(".clock").html(time);
					$(".status").html("Work");
				}
			}
		}
		if(i === true){
		i = false;
		interval = setInterval(timerStart,1000);
		}
	})
})