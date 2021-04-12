<template>
    <div class="rtc-side-tab">
        <div class="rtc-side-tab-header">
            <div class="rtc-side-tab-header-btn" v-for="(v,i) in headers" :key="i" :class="{active:selectedIndex == i}" @click.stop="()=>onHeaderBtnClick(i)">
                <span>{{v}}</span>
            </div>
        </div>
        <div class="rtc-side-tab-body">
            <div class="rtc-side-tab-body-container" ref="tab_body_ctn" :style="'transform:translateX('+ translateX + ')'">
                <div class="rtc-side-tab-body-page" v-for="(v,i) in headers" :key="i" :class="{active:selectedIndex == i}">
                    <slot :name="i"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const propName = "selectedIndex";
const eventName = "selected-index-changed";
export default {
    props:{
        [propName]:{
            type:Number,
            default: 0
        },
        headers:{
            type: Array,
            default:() => []
        }
    },
    model:{
        prop:propName,
        event:eventName
    },
    computed:{
        translateX(){
            return - 100*this.selectedIndex + '%';
        }
    },
    methods:{
        onHeaderBtnClick(index){
            this.$emit(eventName,index);
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>