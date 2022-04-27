<template>
  <div  :style="{ backgroundImage: 'url(' + this.imgUrl('lanchBackground') + ')' }" 
    class="bg-color-wrapper bg-cover h-screen  ">
    <div class="bg-black-layer w-full h-screen flex items-center justify-center">
    <!-- Card -->
    <div class="bg-white border-2 border-amber-200 rounded-2xl p-5 w-96">
    
      <!-- Caption -->
      <p class="text-2xl font-bold text-gray-500 pt-4 text-center">Connect to AntBundle and become an Ant.</p>

      <!-- Register Button -->
      <button 
        class="hover:bg-amber-600 bg-amber-500 delay-75 
        duration-100 text-white text-sm font-bold rounded-2xl 
        w-full py-3 mt-7 border-b-4  border-b-green-600"
        @click="lanch()" >Connect with Metamask</button> 
    </div>
    </div>
  </div>
</template>

<script>
import matemask from '@/scripts/metamask'
export default {
  name: 'Login',
  components: {
  },
  data(){
    return{
    }
  },
  computed:{
    fourAvatar(){
      return funct.fourAvatar(this.obj.addr_list);
    },
    kether(){
      return funct.kether(this.obj.value);
    },
  },
  methods:{
    lanch(){
      matemask.login();
    },
    imgUrl(img){
      return require(`@/assets/img/${img}.png`);
    },
  },
  mounted(){
    this.$store.commit("addNote", [])
  }
}
</script>


