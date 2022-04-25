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
    <div class="bg-trasp-white h-12 rounded-xl p-2 ">
      <div class="grid  grid-cols-4">
        <div class="text-4xl font-bold font-serif  text-center leading-3">{{ Number(obj.user_count) }}</div>
        <div class="col-span-2">
          <div class=" text-center">
            <div class="font-bold font-serif leading-3 text-center pb-1"><span class="font-sans" >Ξ</span>{{ kether }}</div>
            <div class="font-bold font-serif leading-3 text-center"><span class="font-sans" >Ξ</span>{{ kether }}</div>
          </div>
        </div>
        <div class="text-4xl font-bold font-serif text-center leading-3">{{ Number(obj.user_count) }}</div>
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

