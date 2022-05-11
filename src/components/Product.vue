<template>
<div class="
      overflow-hidden
      rounded-3xl
      shadow-lg
      bg-white
      block
      w-full
      h-80
      md:h-72
      lg:h-64
      xl:h-80
      bg-cover
     "
   :style="{ backgroundImage: 'url(' + obj.image_url + ')'}" @click.self="showProductDetail(obj,$event)" >
  <div class="grid w-full p-4">
    <div class="bg-trasp-white h-16 rounded-3xl p-2 ">
      <div class="grid  grid-cols-4">
      <div class="col-span-3">
        <div class="  flex -space-x-6 md:ml-6">
          <template v-if="Number(obj.user_count)">
            <div v-for="(address, index) in Avatars"
              :key="'count-' + index + 1"
              class="md:hidden  inline-block w-12 h-12 rounded-full ring-2 ring-white"
              :style="{ backgroundColor: colorAddr(address) }"
            ></div>
            <div v-for="(address, index) in fourAvatar"
              :key="'count-' + index + 1"
              class="hidden md:block w-12 h-12 rounded-full ring-2 ring-white"
              :style="{ backgroundColor: colorAddr(address) }"
            ></div>
          </template>
          <div v-if="obj.user_count <  Number(obj.goal)" class="
            
             inline-block
            w-12
            h-12
            p-2
            bg-amber-300
            ring-2 ring-white
            rounded-full
            border-100
            " @click="invest">
            <Icons name="plus" />
          </div>
          <div v-else class="inline-block h-12 w-12 bg-gray-200 ring-2 ring-white rounded-full p-2" >
            <Icons name="plus" />
          </div>
        </div>
      </div>
      <div>
        <ul class="list-none">
          <li class="text-4xl font-bold font-serif  text-right leading-3">{{ Number(obj.user_count) }}</li>
          <li class="font-bold font-serif leading-3 text-right price-size"><span class="font-sans" >Ξ</span>{{ kether }}</li>
        </ul>
      </div>
      </div>
      </div>
  </div>
</div> 
</template>

<script>


import Icons from '@/components/Icons.vue'
import w3 from '@/scripts/w3'
import funct from '@/scripts/funct'
export default {
  name: 'Prouduct',
  props:["obj"],
  components: {
    Icons
  },
  data(){
    return{
      progress:0,
      bundels:[
       ], 
    }
  },
  computed:{
    fourAvatar(){
      return funct.fourAvatar(this.obj.addr_list)
    },
    Avatars(){
      return funct.fourAvatar(this.obj.addr_list, 8)
    },
    kether(){
      return funct.kether(this.obj.value)
    },
  },
  methods:{
    invest(){
      this.$parent.pay(this.obj)
    }, 
    colorAddr(addr){
      return funct.colorAddr(addr)
    },
    showProductDetail(obj, evt){
      this.$parent.productSetup(obj, evt )
    },
    imgUrl(img){
     return require(`@/assets/img/${img}.png`)
      // The path could be '../assets/img.png', etc., which depends on where your vue file is
    },
  },
  mounted(){

  }
}
</script>


