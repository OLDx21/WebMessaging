var stompClient = null;
window.onload = function () {
    connect();
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    } else {
        $("#conversation").hide();
    }
    $("#chat").html("");
}

function connect() {
    var socket = new SockJS('/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/chat/messenger', function (greeting) {
            showGreeting(JSON.parse(greeting.body).userName, JSON.parse(greeting.body).content);
        });
    });
}

function sendMessage() {
    stompClient.send("/app/send", {}, JSON.stringify({'userName': $("#name").val(), 'content': $("#message").val()}));
    document.getElementById('message').value = ''
}

function showGreeting(user, message) {
    $("#chat").append("<tr><td>" + user + ": " + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#send" ).click(function() { sendMessage(); });
});

