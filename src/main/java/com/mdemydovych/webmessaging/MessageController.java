package com.mdemydovych.webmessaging;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    @MessageMapping("/send")
    @SendTo("/chat/messenger")
    public MessageResponse sendMessage(Message message) {
        return new MessageResponse(message.getUserName(), message.getContent());
    }
}
