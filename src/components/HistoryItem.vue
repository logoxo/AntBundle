<template>
  <div class="py-8 flex md:items-start items-center flex-col md:flex-row">
    <div
      class="flex items-center pb-4 md:py-0 w-full justify-between md:w-auto"
    >
      <div class="w-40 h-40 md:w-52 md:h-52">
        <img
          class="object-cover w-full h-full rounded-3xl image-gray"
          :class="isOdd ? '' : 'inactive-image'"
          :src="obj.image_url"
        />
      </div>
      <div class=" flex flex-col px-2 md:px-8 h-full justify-center md:w-52 pt-4 md:py-0 " >
        <div
          class="flex flex-col mb-4"
          v-for="(price, i) in priceItems"
          :key="i"
        >
          <div class="text-xs text-gray-300">{{ price.label }}</div>
          <div
            class="text-xl font-bold leading-3 flex text-gray-600 items-center"
          >
            <div class="unset-font">Ξ</div>
            <div class="font-serif">{{ price.price }}</div>
          </div>
        </div>
      </div>
    </div>
    <div style="flex: 1" class="h-52 w-full">
      <fieldset class=" border-solid border-gray-600 p-6 w-full h-full rounded-xl overflow-y-auto border-4 " >
        <legend class="text-sm px-2 text-gray-300 font-serif">AntBundle</legend>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(address, index) in obj.addr_list"
            class="rounded-full h-14 w-14"
            :key="index"
            :style="{ backgroundColor: colorAddr(address) }"
          ></div>
        </div>
      </fieldset>
    </div>
    <div class="md:pl-4 text-white md:pt-2 pt-4 w-full md:w-32">
      <div class="flex md:block justify-between">
        <div class="text-sm font-serif text-gray-300" style="flex: 1">Brought Date</div>
        <div class="text-sm font-serif text-gray-300  md:text-xl">07.22.2021</div>
      </div>
      <div v-if="isOdd" class="flex md:block mt-3 justify-between">
        <div class="text-sm font-serif text-gray-300" style="flex: 1">Sold Date</div>
        <div class="text-sm font-serif text-gray-300 md:text-xl">07.22.2021</div>
      </div>
    </div>
  </div>
</template>

<script>
import Icons from "@/components/Icons.vue";
import w3 from "@/scripts/w3";
import funct from "@/scripts/funct";
export default {
  name: "DetailPage",
  props: ["name", "obj", "index"],
  components: {
    Icons,
  },
  data() {
    return {
      progress: 0,
    };
  },
  computed: {
    isOdd() {
      return this.index % 2 != 0;
    },
    priceItems() {
      let items = [];
      let doc = {
        "NFT Price": this.nftPrice,
        "NFT Ant Price": this.kether,
        "NFT sell price": this.sellPrice,
      };
      Object.keys(doc).forEach((label) => {
        items.push({ label, price: doc[label] });
      });
      return items;
    },
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
  },
  methods: {
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

<style scoped>
/*
@media (max-width: 520px) {
  .prices-wrapper {
    grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
  }
}

*/
.image-gray {
  filter: gray; /* IE6-9 */
  -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
  filter: grayscale(1); /* Microsoft Edge and Firefox 35+ */
}
.inactive-image {
  -webkit-filter: grayscale(0);
  filter: none;
}
</style>

