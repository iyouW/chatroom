import { ChatService } from './chatService';
import { ChatMessage } from './chatMessage';

export class ChatRoom {

    constructor(){
        this._service = new ChatService();

        this._inputMessage = '';
        this._messages = [];

        this._sdkAppId = '';
        this._userId = '';
        this._userSig = '';
        this._groupId = '';
    }

    get inputMessage(){
        return this._inputMessage;
    }

    set inputMessage(value){
        this._inputMessage = value;
    }

    get messages(){
        return this._messages;
    }

    get userId(){
        return this._userId;
    }

    get groupId(){
        return this._groupId;
    }

    async startAsync(sdkAppId,userId,userSig,groupId){
        this._sdkAppId = sdkAppId;
        this._userId = userId;
        this._userSig = userSig;
        this._groupId = groupId;

        await this._service.startAsync(sdkAppId,userId,userSig, this.onReceiveMessage.bind(this));
        await this._service.changeGroupAsync(groupId);
    }

    async sendMessageAsync(){
        const message = ChatMessage.Create(ChatMessage.Type.MESSAGE, this._inputMessage);
        this.inputMessage = '';
        this._messages.push({
            from: this._userId,
            text: message.text,
            dir: 'right'
        })
        await this._service.sendMessageAsync(message);
    }

    onReceiveMessage(evt){
        for (const message of evt.data) {
            const chatMessage = JSON.parse(message.payload.text);
            if(chatMessage.type == ChatMessage.Type.MESSAGE){
                this._messages.push({
                    from: message.from,
                    text: chatMessage.text,
                    dir: 'left'
                });
            }
        }
    }

    async stopAsync(){
        await this._service.stopAsync();
    }
}