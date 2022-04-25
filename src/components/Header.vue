<template>
  <div>
    <div class="grid  grid-cols-6  px-5 py-2 items-center">
      <div id="logo" class="flex justify-center sm:col-span-2 md:col-span-1  py-2 rounded-md "> 
        <div class="flex justify-center">
          <router-link to="/">
            <img
              id="ant-bundle-logo"
              src="../assets/svg/logo.svg"
              class="w-14 ml-2"
              alt=""
            />
          </router-link>
          <router-link to="/">
            <h1 class="pl-2 hidden lg:block"><strong>AntBundle</strong></h1>
          </router-link>
        </div>
      </div>
        <div class="container col-span-3 md:col-span-4 ">
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
          class="w-14 h-14 rounded-full ring-4 ring-gray-200"
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
      return this.$store.getters.notify
    },
    isAuth(){
      return this.$store.getters.auth
    },
    currentAddress(){
      return this.$store.getters.address
    },
  },
  watch: {
    isAuth(newValue) {
      if(newValue){
        this.$router.replace('/')
      }else{
        this.$router.replace('/launch')
      }
    }
  },
  methods:{
    colorAddr(){
      return get.colorAddr(this.currentAddress)
    },
    async login(){ 
      if(window.ethereum){

          // get current network
          const networkId = process.env.VUE_APP_NETWORK;
          const currentNetworkId = Number(window.ethereum.networkVersion) 

          // if current network is not equal mainnet switch to mainnet   
          if(networkId !== currentNetworkId){
            await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
              params: [{ chainId: w3.prov.utils.toHex(networkId) }],
            });   
          }
          
          // get accounts
          const accounts  = await window.ethereum.request({
           method: "eth_accounts"
          })

          console.log(accounts)
          // check if user is logged in
          if(accounts.length === 0){
           try{
            const account = await window.ethereum.request({
               method: "eth_requestAccounts"
            })
            
            ccnsole.log(account)

            this.account = account[0]
            //this.$store.dispatch("send", account[0]) 
            //this.$store.dispatch("login") 
            //this.$forceUpdate();
           }catch(error){
             //console.log(error)
             if(error.message === "Already processing eth_requestAccounts. Please wait."){
              this.$store.commit("addNote", [{ type:'Info', text: "Please try to Login by clicking at the Metamask icon"  }])
             }
           }
          }else{

            const save_account  = await window.ethereum.request({
             method: "eth_accounts"
            })
            ccnsole.log(save_account)
            this.$store.dispatch("send", save_accounts[0]) 
            this.$forceUpdate();

          }
      }

    } // end login()
  }
}
</script>

