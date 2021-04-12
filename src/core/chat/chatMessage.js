export class ChatMessage {

    static Type = {
        COMMAND:1,
        MESSAGE:2
    }

    static Create(type, text){
        return new ChatMessage(type, text);
    }

    constructor(type, text){
        this.type = type;
        this.text= text;
    }

}