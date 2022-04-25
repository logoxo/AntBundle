<template>
  <div  :style="{ backgroundImage: 'url(' + this.imgUrl('background1') + ')' }" 
    class="bg-color-wrapper bg-cover h-screen flex items-center justify-center ">

    <!-- Card -->
    <div class="bg-white border-2 border-gray-300 rounded-2xl p-5 w-96">
    
      <!-- Caption -->
      <p class="text-5xl font-bold text-gray-700 pt-4 text-center">404 <br /> page not found</p>

      <!-- Register Button -->
      <button 
        class="hover:bg-blue-600 bg-gray-600 delay-75 
        duration-100 text-white text-sm font-bold rounded-2xl 
        w-full py-3 mt-7 border-b-4  border-b-green-600"
        @click="lanch()" >Back to home</button> 
    </div>

  </div>
</template>

<script>


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
      this.$router.replace('/')
    },
    imgUrl(img){
      return require(`@/assets/img/${img}.png`);
      // The path could be '../assets/img.png', etc., which depends on where your vue file is
    },
  },
  mounted(){
    this.$store.commit("addNote", [])

  }
}
</script>


