
	var conn = new WebSocket('ws://192.168.0.72:8888');
	conn.onopen = function(e) {
	    
	};

	conn.onmessage = function(e) {    
	    
		var message = $.parseJSON(e.data);
		console.log(e);

		switch (message.type) {
			
			case 'init':
				setupmessages(message);
				break;

			case 'add':
				addMsg(message);
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
	function addMsg(message){
		// console.log(message);
		$('.messages').append("<div>Name:</div>"+message.user+"<div>"+ message.message +"</div>");
	}

$(function () {
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



