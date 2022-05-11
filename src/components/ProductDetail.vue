<template>
  <div
    class="
      h-full
      xl:p-8
      bg-white bg-cover
      rounded-3xl
      w-full
      flex flex-col
      p-0
      md:p-4
    "
  >
    <div class="flex flex-col h-full gap-4 md:flex-row justify-between">
      <div>
        <div
          class="
            p-4 md:p-0 w-full
            md:w-52 md:h-52
            lg:w-52 lg:h-52
            xl:w-80 xl:h-80
            h-64 bg-cover
            justify-items-center
          "
        >
          <img
            class="object-cover w-full h-full rounded-3xl"
            :src="obj.image_url"
          />
        </div>
      </div>
      <div class="w-full flex flex-col justify-between px-4">
        <div class="flex md:pl-1 flex-col md:flex-row">
          <div
            class="
              flex flex-col xl:mr-8 md:p-2
              items-center justify-center relative
              xl:w-36 xl:h-20
              md:w-28 md:h-20
              h-18 bg-gray-100 md:bg-white
              rounded-lg md:mb-0 md:mr-4 mb-4
              w-full
            "
            v-for="(price, i) in priceItems"
            :key="i"
          >
            <div
              class="
                text-xs text-gray-600
                bg-gray-100 absolute rounded-lg
                p-1 px-2 top-1
              "
            >
              {{ price.label }}
            </div>
            <div
              class="
                text-3xl md:text-xl xl:text-3xl
                font-bold leading-3 flex
                text-gray-600
                items-center
                bg-gray-100
                rounded-xl
                p-3 px-5 mt-3
                md:mt-0
              "
            >
              <div class="unset-font">Ξ</div>
              <div><span class="font-serif">{{ price.price }}</span></div>
            </div>
          </div>
        </div>
        <div
          class="
            relative flex items-center
            justify-start col-span-4
            md:border-8 border-4 border-amber-200
            rounded-full
            xl:h-20
            md:h-16 md:mt-0
            mt-4
            h-12
          "
        >
          <div
            class="
              absolute top-0 left-0 z-10 flex
              items-center justify-end w-full h-full
            " >
            <p
              style="top: 50%; right: 50%; transform: translate(0%, -50%)"
              class="
                absolute
                -mr-3
                font-serif
                text-center
                md:text-xl
                xl:text-5xl
                ants-number
              "
            >
              {{ Number(obj.addr_list.length) }} /
              {{ Number(obj.goal) }}
            </p>
            <div
              v-if="obj.user_count < Number(obj.goal)"
              class=" w-16 h-16 p-2 -mr-3 bg-amber-300
                border-8 border-amber-200
                rounded-full
                xl:h-28 xl:w-28
                md:h-20 md:w-20
                button-buy
              "
              @click="[progressBar(), invest()]"
            >
              <Icons name="plus" />
            </div>
            <div
              v-else
              class="
                w-16
                h-16
                p-2
                -mr-3
                bg-gray-300
                border-8 border-gray-100
                rounded-full
                xl:h-28 xl:w-28
                md:h-20 md:w-20
                button-buy
              "
            >
              <Icons name="plus" />
            </div>
          </div>
          <div
            class="
              h-full
              rounded-full
              bg-gradient-to-r
              from-yellow-200
              to-yellow-500
              rounded-r-2xl
            "
            :style="{ width: progress + '%' }"
          ></div>
        </div>
        <div class="flex items-center gap-4 icons-wrapper">
          <div
            v-for="(name, index) in obj.platform"
            :key="name + index"
            @click="openShareLink(name)"
            class="
              relative
              flex
              items-center
              justify-center
              xl:w-20 xl:h-20
              w-12
              h-12
              mt-4
              md:mt-0
              col-span-4
              rounded-full
              image-gray
            "
            :class="getbg(name)"
          >
            <Icons :name="name" />
          </div>
          <socialShare :info=obj  />
        </div>
      </div>
      <div>
        <div
          class="
            w-64
            hidden
            lg:block
            md:w-72
            lg:w-52
            xl:w-72
            xxl:w-80
            h-64
            md:h-72
            lg:h-52
            xl:h-80
          "
        >
           <fieldset
            class="
              border-solid border-gray-200
              w-full
              h-full
              rounded-3xl
              overflow-y-auto
              border-8
              px-4
              pt-2
              no-scrollbar
            "
          >
            <legend class="text-lg text-gray-400 px-2 font-serif">Ant Bundel</legend>
            <div class="grid grid-cols-3 xl:grid-cols-4 gap-2">
              <div
                v-for="(address, index) in obj.addr_list"
                class="rounded-full h-12 w-12 xl:h-12 xl:w-12"
                :key="index"
                :style="{ backgroundColor: colorAddr(address) }"
              ></div>
            </div>
          </fieldset> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icons from "@/components/Icons.vue";
import w3 from "@/scripts/w3";
import ct from '@/scripts/const'
import funct from "@/scripts/funct";
import socialShare from "@/components/SocialShare.vue";
export default {
  name: "DetailPage",
  props: ["name", "obj"],
  components: {
    Icons,
    socialShare,
  },
  data() {
    return {
      progress: 0,
    };
  },
  computed: {
    sellPrice() {
      return funct.sellPrice(this.obj.value, this.obj.goal);
    },
    nftPrice() {
      return funct.nftPrice(this.obj.value, this.obj.goal);
    },
    fourAvatar() {
      return funct.fourAvatar(this.obj.addr_list);
    },
    kether() {
      return funct.kether(this.obj.value);
    },
    priceItems() {
      let items = [];
      let doc = {
        "NFT Price": this.nftPrice,
        "Bundel Price": this.kether,
        "NFT sell price": this.sellPrice,
      };
      Object.keys(doc).forEach((label) => {
        items.push({ label, price: doc[label] });
      });
      return items;
    },
  },
  methods: {
    invest(){
      this.$parent.pay(this.obj)
    }, 
    getbg(type) {
      switch (type) {
        case "rarible":
          return "bg-yellow-400";
        case "opensea":
          return "bg-blue-400";
        default:
          return "";
      }
    },
    openShareLink(type) {
      let link = "";
      const network = 4
      let { obj } = this;
      switch (type) {
        case "rarible":
          if(ct.networkId = network){
            link = `https://rinkeby.rarible.com/token/${obj.image_addr}:${obj.image_id}`;
          }else{ 
            link = `https://rarible.com/token/${obj.image_addr}:${obj.image_id}`;
          } 
          break;
        case "opensea":
          if(ct.networkId = network){
            link = `https://testnets.opensea.io/assets/${obj.image_addr}/${obj.image_id}`;
          } else{ 
            link = `https://opensea.io/assets/${obj.image_addr}/${obj.image_id}`;
          }
          break;
        default:
      }
      if (link) window.open(link, "_blank");
    },
    progressBar() {
      console.log("click");
      if (this.progress < 100) {
        this.progress += 5;
      }
    },
    colorAddr(addr) {
      return funct.colorAddr(addr);
    },
    imgUrl(img) {
      return require(`@/assets/img/${img}.png`);
      // The path could be '../assets/img.png', etc., which depends on where your vue file is
    },
  },
};
</script>



