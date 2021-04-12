<template>
  <div class="home">
    <tab v-model="selectedIndex" :headers="headers">
      <chat-board slot="0" :messages="chatRoom.messages" v-model="chatRoom.inputMessage" @send-message="onSendMessage"/>
    </tab>
  </div>
</template>

<script>
import Tab from '../components/tab/Index';
import ChatBoard from '../components/chatBoard/Index';
import { mapGetters } from 'vuex';

export default {
  components:{
    Tab,
    ChatBoard
  },
  data(){
    return {
      selectedIndex:0,
      headers:['聊天','成员(12)'],
      sdkAppId:'1400494935',
      users:{
        'iwander':'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwpnliXkpQBZEqjglO7GgIDNFycrQxMDAxNLE0tgUIpNaUZBZlAoUNzU1NTIwMICIlmTmgsTMDM0tzI3MLY2hpmSmA02uqjR2y-JPTy7ydcoxSPP3CywOLnF0DityTkoMN4rUDsgp8zVwMk8K9PL0tFWqBQDAsTIt',
        'iwander1':'eJwtzMEKgkAUheF3ma1h13EmR6FdLkSJSiuUNsLM2EUyU7MgevdMXZ7vwP8hSRSbvWqIR6gJZDFulKrqUOPI*MorqRpr-lpZ5nWNkngWA2Auc20*PepdY6MG55xTAJi0w9vfVpYjHCpse65gMaTVJkuv5*BY7OPA2KUhDZPtvS-1owUqU02T02UZPQ3hlwd-Tb4-CiwyZQ__',
        'iwander2':'eJwtzFELgjAYheH-sltD5trmFLooCkEqxYKuxc34Wi5dpkH03zP18jwH3g86709upywKEXExWowbpDItlDAy9LmRypL5e0qd1zVIFHoUYxrQYMmmR71rsGpwxhjBGE-aQvU37vnCJ4KJuQLXIa273uGVYxpzSZN1VkWb8rC7m5vtdfaKt0Wjizil-JhEjxX6-gDyvTMs'
      },
      groupId:'278910'
    }
  },
  computed:{
    ...mapGetters(['chatRoom'])
  },
  async created(){
    const userId = this.$route.query.userId;
    await this.chatRoom.startAsync(this.sdkAppId,userId,this.users[userId],this.groupId);
  },
  methods:{
    async onSendMessage(){
      await this.chatRoom.sendMessageAsync();
    }
  }
}
</script>
<style lang="scss" scoped>
.home{
  margin:0 auto;
  width: 375px;
  height: 516px;
  background-color: white;
  transform: translateY(80px) translateZ(50px);
}
</style>
