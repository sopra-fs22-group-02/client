
/* eslint-disable */
// first we conntect
function connect(event) {
    username = document.querySelector('#name').value.trim();

    if(username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new SockJS('http://10.211.55.4:8080/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}

// Leave the current room and enter a new one.
function enterRoom(newRoomId) {
    roomId = newRoomId;
    Cookies.set('roomId', roomId);
    roomIdDisplay.textContent = roomId;
    topic = `/app/chat/${newRoomId}`;
  
    if (currentSubscription) {
      currentSubscription.unsubscribe();
    }
    currentSubscription = stompClient.subscribe(`/channel/${roomId}`, onMessageReceived);
  
    stompClient.send(`${topic}/addUser`,
      {},
      JSON.stringify({sender: username, type: 'JOIN'})
    );
  }


// A callback passed to the stomp client
// NOT USED!
// function onConnected() {
//     // Subscribe to the Public Topic
//     stompClient.subscribe('/topic/public', onMessageReceived);

//     // Tell your username to the server
//     stompClient.send("/app/chat.addUser",
//         {},
//         JSON.stringify({sender: username, type: 'JOIN'})
//     )

//     connectingElement.classList.add('hidden');
// }

// the error callback when the connection did not succeed
function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}


// functionality to send a message
// NOT USED!
// function sendMessage(event) {
//     // var messageContent = messageInput.value.trim();
//     if(messageContent && stompClient) {
//         var chatMessage = {
//             sender: username,
//             content: messageInput.value,
//             type: 'CHAT'
//         };
//         stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
//         messageInput.value = '';
//     }
//     event.preventDefault();
// }

function sendMessage(event) {
    var messageContent = messageInput.value.trim();
    if (messageContent.startsWith('/join ')) {
      var newRoomId = messageContent.substring('/join '.length);
      enterRoom(newRoomId);
      while (messageArea.firstChild) {
        messageArea.removeChild(messageArea.firstChild);
      }
    } else if (messageContent && stompClient) {
      var chatMessage = {
        sender: username,
        content: messageInput.value,
        type: 'CHAT'
      };
      stompClient.send(`${topic}/sendMessage`, {}, JSON.stringify(chatMessage));
    }
    messageInput.value = '';
    event.preventDefault();
  }

// when a STOMP message is received, handles how to handle it in the chatbox
function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    // var messageElement = document.createElement('li');

    if(message.type === 'JOIN') {
        // messageElement.classList.add('event-message');
        // message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        // messageElement.classList.add('event-message');
        // message.content = message.sender + ' left!';
    } else {
        // messageElement.classList.add('chat-message');

        // var avatarElement = document.createElement('i');
        // var avatarText = document.createTextNode(message.sender[0]);
        // avatarElement.appendChild(avatarText);
        // avatarElement.style['background-color'] = getAvatarColor(message.sender);

        // messageElement.appendChild(avatarElement);

        // var usernameElement = document.createElement('span');
        // var usernameText = document.createTextNode(message.sender);
        // usernameElement.appendChild(usernameText);
        // messageElement.appendChild(usernameElement);
    }

    // var textElement = document.createElement('p');
    // var messageText = document.createTextNode(message.content);
    // textElement.appendChild(messageText);

    // messageElement.appendChild(textElement);

    // messageArea.appendChild(messageElement);
    // messageArea.scrollTop = messageArea.scrollHeight;
}