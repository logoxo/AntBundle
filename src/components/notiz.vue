<template>
  <div v-if="notification">
    <div v-if="notify.type.toLowerCase() === 'error'"  class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
      <strong class="font-bold">{{ notify.type }} : </strong>
      <span class="block sm:inline">{{ notify.text }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 pt-2 sm:pt-2">
        <svg @click="close" class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
      </span>
    </div>

    <div v-if="notify.type.toLowerCase() === 'info'"  class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded relative" role="alert">
      <strong class="font-bold">{{ notify.type }}: </strong>
      <span class="block sm:inline">{{ notify.text }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-2 ">
        <svg @click="close" class="fill-current h-6 w-6 text-yellow-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
      </span>
    </div>

    <div v-if="notify.type.toLowerCase() === 'success'" class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative" role="alert">
      <strong class="font-bold">{{ notify.type }}: </strong>
      <span class="block sm:inline">{{ notify.text }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-2 " >
        <svg @click="close" class="fill-current h-6 w-6 text-green-500" role="button"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
      </span>
    </div>

    <div v-if="notify.type.toLowerCase() === 'loading'"> 
      <div id="loading" class="z-0">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="relative z-10">
        <span class="absolute text-center op-5 bottom-0 loading-message">{{ notify.text }}</span>
      </div>
    </div>
    </div>
    
</template>

<script>
import Icons from '@/components/Icons.vue'
import w3 from '@/scripts/w3' 
import funct from '@/scripts/funct'
export default {
  name: 'Header',
  components: {
    Icons 
  },
  data(){
    return{
      notification:false 
    }
  },
  computed:{
    notify(){ 
      return this.$store.getters.notify   
    },
  },
  watch: {
    notify(newValue) {
      const message = !!newValue;
      if(message === true  ){
        // if loading don't close notification
        if(newValue.type.toLowerCase() === 'loading' ){
          this.notification = true;
          return;
        }
        // if error, success or warning close notification after 8 secounds
        this.notification = true;
        setTimeout(() => { this.close() }, 8000);
      }else{
        this.notification = false;
      }
    }
  },
  methods:{
    close(){
      this.show = false; 
      this.$store.commit("addNote",[]);
    }
  },
  mounted(){
  }
}
</script>


