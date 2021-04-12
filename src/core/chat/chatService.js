// TIM SDK
import TIM from 'tim-js-sdk';
// 发送图片、文件等消息需要腾讯云 即时通信 IM 上传插件
import TIMUploadPlugin from 'tim-upload-plugin';

export class ChatService {

    /**
     * ChatService 类
     * @constructor
     */
    constructor(){
        this._client = null;
        this._groupId = null;
    }

    /**
     * tim sdk 实例
     */
    get client(){
        return this._client;
    }

    /**
     * 当前加入的群组
     */
    get groupId(){
        return this._groupId;
    }

    /**
     * 开始会话
     * @param {string} sdkAppId - 腾讯云IM应用标识
     * @param {string} userId - 用户标识
     * @param {string} userSig - 用户签名
     * @param {function} onMessageReceived - 收到消息回调
     * @returns {Promise} - 开始会话是否完成
     */
    startAsync(sdkAppId,userId,userSig,onMessageReceived){
        this._client = TIM.create({
            SDKAppID:sdkAppId
        });
        this._client.registerPlugin({'tim-upload-plugin': TIMUploadPlugin});
        this._client.on(TIM.EVENT.MESSAGE_RECEIVED, evt=>onMessageReceived(evt));
        const readyPromise = new Promise(resolve => {
            this._client.on(TIM.EVENT.SDK_READY,() =>{
                resolve();
            })
        });
        const loginPromise = this._client.login({userID: userId, userSig: userSig});
        return Promise.all([loginPromise, readyPromise]);
    }

    /**
     * 切换分组
     * @param {string} groupId - 分组标识
     * @returns {Promise}
     */
    async changeGroupAsync(groupId){
        if(this._groupId){
            await this._client.quitGroup(this._groupId);
        }
        this._groupId = groupId;
        return this._client.joinGroup({
            groupID:groupId
        });
    }

    /**
     * 创建群组
     * @param {string} groupId - 群组标识
     * @returns {Promise}
     */
    createGroupAsync(groupId){
        return this._client.createGroup({
            name: groupId,
            type: TIM.TYPES.GRP_MEETING,
            groupID: groupId,
        });
    }

    /**
     * 发送消息
     * @param {ChatMessage} message - 消息
     * @returns {Promise}
     */
    sendMessageAsync(message){
        const jsonMessage = JSON.stringify(message);
        const timMessage = this._client.createTextMessage({
            to:this._groupId,
            conversationType:TIM.TYPES.CONV_GROUP,
            payload:{
                text:jsonMessage
            }
        });
        return this._client.sendMessage(timMessage,{
            onlineUserOnly:true
        });
    }

    /**
     * 停止会话
     */
    async stopAsync(){
        await this._client.quitGroup(this._groupId);
        await this._client.logout();
    }
}