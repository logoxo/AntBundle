<template>
<div class="container max-w-full bg-color-wrapper">
    <section v-if="!loading" class="sticky top-0 z-50 bg-white "  id="header">   
      <Header />
    </section>
    <section  id="content" class=" min-h-screen">
    <router-view/>
    </section>
    <section id="footer">
    </section>
</div>
</template>
<script>
import Header from '@/components/Header.vue'
import metamask from '@/scripts/metamask'
export default {
  name: 'App.vue',
  components: {
    Header
  },
  data(){
    return{
      loading: false
    } 
  },
  computed:{
    isUser(){
      return this.$store.getters.isAuthenticated
    },
  },
  methods:{
    hiddeHeader(bool){
      this.loading = bool;
      console.log(this.loading)
    }
  },
  async mounted(){
    this.$store.dispatch("loadDB");
    if(window.ethereum){
      // load metamask functions 
      const networkId = Number(window.ethereum.networkVersion) 
      metamask.setup(networkId)
    }else{
      this.$store.commit("addNote", [{ type:'Error', text: `Please install Metamask`  }])
    }

  }
}
</script>
