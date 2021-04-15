<template>
    <div class="message-producer">
        <div class="message-producer-header">
            <span>发送至</span>
            <span>所有人</span>
        </div>
        <div class="message-producer-body">
            <div class="message-producer-body-input">
                <textarea v-model="value" :placeholder="placeholder" @input="onInput"/>
            </div>
            <div class="message-producer-body-btn">
                <button :class="{disabled:!value}" @click.stop="onSendMessage">发送</button>
            </div>
        </div>
    </div>
</template>
<script>
const propName = 'message';
const eventName = 'message-changed';

const sendMessageEvent="send-message";

import { UIUtil } from '../../util/ui';

export default {
    props:{
        placeholder:{
            type: String,
            default: '我要发言'
        },
        [propName]: {
            type: String,
            default:''
        }
    },
    model:{
        prop: propName,
        event: eventName
    },
    computed:{
        value:{
            get(){
                return this[propName];
            },
            set(val){
                this.$emit(eventName, val);
            }
        }
    },
    methods:{
        onInput(e){
            const target = e.currentTarget;
            const { height, overflowY } = UIUtil.ComputeAutoHeight(target,1,3);
            target.style.height = height;
            target.style.overflowY = overflowY;
        },
        onSendMessage(){
            this.value && this.$emit(sendMessageEvent, this.value);
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>