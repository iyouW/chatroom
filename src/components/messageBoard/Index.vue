<template>
    <div class="message-board" :class="dir">
        <div class="message-board-header">
            <div class="message-board-from">{{from}}</div>
        </div>
        <div class="message-board-body">
            <div class="message-board-text">{{text}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        from:{
            type: String,
            default:''
        },
        text:{
            type: String,
            default:''
        },
        dir:{
            type:String,
            default:'left'
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>