<template>
  <div>
    <div class="grid  grid-cols-6  px-5 py-2 items-center">
      <div id="logo" class="flex justify-center sm:col-span-2 md:col-span-1  py-2 rounded-md "> 
        <div class="flex justify-center">
          <router-link to="/">
            <img
              id="ant-bundle-logo"
              src="../assets/svg/logo.svg"
              class="w-10 h-10  md:w-14 md:ml-2"
              alt=""
            />
          </router-link>
          <router-link to="/">
            <h1 class="pl-2 pt-2 hidden lg:block"><strong>AntBundle</strong></h1>
          </router-link>
        </div>
      </div>
        <div class="container col-span-4 md:col-span-3 md:col-span-4 ">
          <div class="relative notification min-h-16 sm:pl-2">
            <Notiz />
          </div>
        </div>
    <div v-if="!isAuth" class="flex justify-center"  @click="login" >
      <Icons name="wallet" />
    </div>
    <div v-else class="flex justify-center">
      <router-link to="/user">
        <div
          class=" w-14 h-14 rounded-full ring-4 ring-gray-200"
          :style="{ backgroundColor: colorAddr() }"
        ></div>
      </router-link>
    </div> 
    </div>
    <hr />
  </div>
</template>
<script>
import Icons from '@/components/Icons'
import Notiz from '@/components/notiz'
import get from '@/scripts/funct'
import matemask from '@/scripts/metamask'
import ct from '@/scripts/const'
import w3 from '@/scripts/w3'
export default {
  name: 'Header',
  components: {
    Icons,
    Notiz
  },
  props: {
    msg: String
  },
  data(){
    return{
    }
  },
  computed:{
    notify(){
      return this.$store.getters.notify;
    },
    isAuth(){
      return this.$store.getters.auth;
    },
    currentAddress(){
      return this.$store.getters.address;
    },
  },
  watch: {
    isAuth(newValue) {
      if(newValue){
        this.$router.replace('/');
      }else{
        this.$router.replace('/launch');
      }
    }
  },
  methods:{
    colorAddr(){
      return get.colorAddr(this.currentAddress);
    },
    async login(){ 
      matemask.login();
    }
  }
}
</script>

