var games;

var conn = new WebSocket('ws://192.168.0.72:8888');
conn.onopen = function(e) {
    
};

conn.onmessage = function(e) {    
    
	var message = $.parseJSON(e.data);
	console.log(e);

	switch (message.type) {
		
		case 'init':
			setupmessages(message);
			// setupScoreboard(message);
			break;

		case 'add':
			// setupmessages(message);
			addMsg(message);
			// goal(message);
			break;

  }

};

function setupmessages(message){
	console.log(message);
	chatters = message.chatters;
	console.log(chatters);
	$.each(chatters, function(id){
		var chat = chatters[id];
		$('.messages').append("<div>Name:</div>"+chat.user+"<div>"+ chat.message +"</div>");
	});
}

function setupScoreboard(message) {
	
	// Create a global reference to the list of games
	games = message.games;

	var template = '<tr data-game-id="{{ game.id }}"><td class="team home"><h3>{{game.home.team}}</h3></td><td class="score home"><div id="counter-{{game.id}}-home" class="flip-counter"></div></td><td class="divider"><p>:</p></td><td class="score away"><div id="counter-{{game.id}}-away" class="flip-counter"></div></td><td class="team away"><h3>{{game.away.team}}</h3></td></tr>';

	$.each(games, function(id){		
		var game = games[id];				
		$('#scoreboard table').append(Mustache.render(template, {game:game} ));		
		game.counter_home = new flipCounter("counter-"+id+"-home", {value: game.home.score, auto: false});
		game.counter_away = new flipCounter("counter-"+id+"-away", {value: game.away.score, auto: false});
	});



}
function addMsg(message){
	// console.log(message);
	$('.messages').append("<div>Name:</div>"+message.user+"<div>"+ message.message +"</div>");
}

function goal(message) {	

	games[message.game][message.team]['score']++;
	var counter = games[message.game]['counter_'+message.team];
	counter.incrementTo(games[message.game][message.team]['score']);
}

$(function () {

	// $(document).on('click', '.team h3', function(e){
	// 	// var game = $(this).parent().parent().attr('data-game-id');		
	// 	// var team = ($(this).parent().hasClass('home')) ? 'home' : 'away';

	// 	conn.send(JSON.stringify({ type: 'goal', team: team, game: game }));
	// });
var user = "";
$('.name-chat').on('keypress', function(e){
	var key = e.which;
	 if(key == 13)  // the enter key code
	  {
		console.log(e.currentTarget.value);
		 user = e.currentTarget.value;
		 $('.name-chat').hide();
		 // $('.msg-chat').show();


		conn.send(JSON.stringify({ type: 'add', user: user }));
	  }
});
$('.msg-chat').on('keypress', function(e){
	var key = e.which;
	if(key == 13)  // the enter key code
	{	
		var msg = e.currentTarget.value;
		conn.send(JSON.stringify({ type: 'add', message: msg , user: user}));
		$(".msg-chat").val("");

	}

});

});



