<template>
    <div class="chat-board">
        <div class="chat-board-message" @scroll.stop="onScroll">
            <div :id="buildMessageBoardWrapperId(i)" v-for="(v, i) in messages" :key="i">
                <message-board  :from="v.from" :text="v.text" :dir="v.dir" />
            </div>
        </div>
        <div class="chat-board-producer">
            <message-producer v-model="inputMessage" @send-message="onSendMessage"/>
        </div>
    </div>
</template>
<script>
import MessageBoard from '../messageBoard/Index';
import MessageProducer from '../messageProducer/Index';

const propName = 'message';
const eventName = 'message-changed';

const sendMessageEvent = 'send-message';

export default {
    components:{
        MessageBoard,
        MessageProducer
    },
    props:{
        messages:{
            type:Array,
            default:()=>[]
        },
        [propName]:{
            type: String,
            default : ''
        }
    },
    model:{
        prop: propName,
        event: eventName
    },
    data(){
        return {
            isScroll:false,
            timer:-1
        }
    },
    computed:{
        inputMessage:{
            get(){
                return this[propName];
            },
            set(val){
                this.$emit(eventName, val);
            }
        }
    },
    watch:{
        messages(val){
            if(!this.isScroll){
                this.$nextTick(()=>{
                    const el = document.getElementById(this.buildMessageBoardWrapperId(val.length-1));
                    el.scrollIntoView(true);
                })
            }
        }
    },
    methods:{
        buildMessageBoardWrapperId(index){
            return `msg_board_wrapper_${index}`;
        },
        onSendMessage(){
            this.$emit(sendMessageEvent, this.inputMessage);    
        },
        onScroll(){
            this.isScroll = true;
            if(this.timer >= 0){
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(()=>{
                this.isScroll = false;
                this.timer = -1;
            }, 1000);
        }
    }    
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>