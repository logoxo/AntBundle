<template>
  <div id="user">
    <section class="bg-white px-5 py-5 h-28 grid   grid-cols-6 items-center ">
      <div class="flex  justify-center">
        <div>
        <div class="text-xs text-gray-600">wallet</div>
        <div class="text-xl font-bold leading-3 flex text-gray-600 items-center">
          <div class="unset-font">Ξ</div>
          <div>0.0354</div>
        </div>
        </div>
      </div>
      <div class="relative col-span-4 flex place-content-center top-4 md:-top-10">
        <div
           v-if="!doc" 
          class="absolute bg-red-200 h-20 w-20 ring-4 ring-white md:h-44 md:w-44 rounded-full"
        ></div>
      </div>
      <div 
        v-if="!doc"
        @click="doc = !doc"
        class="text-lg font-bold text-gray-600 text-center p-2 rounded-xl border-2 border-gray-300  bg-gray-200">
        AntPlan
      </div>
      <div 
        v-else
        @click="doc = !doc"
        class="text-lg font-bold text-gray-600 text-center p-2 rounded-xl border-2 border-gray-300  bg-gray-200"
        >AntItem</div> 
    </section>

    <section v-if="!doc">
        <div class="container   m-auto">
          <div class="px-5 py-5 h-28 flex justify-between items-center">
            <div
              class="text-xl font-bold text-white cursor-pointer"
              @click="tab = 'nfts'"
              :class="isHistory ? 'text-gray-600' : 'text-white'"
            >
              My NFTs
            </div>
            <div
              @click="tab = 'history'"
              class="text-xl font-bold cursor-pointer"
              :class="isHistory ? 'text-white' : 'text-gray-600'"
            >
              History
            </div>
          </div>
        </div>

        <div v-if="!isHistory">
          <div class="mx-auto px-4 pb-4">
            <div class="container m-auto">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div v-for="(product, i) in products" :key="i" >
                <product :obj="product" :index="i"></product>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="container m-auto">
            <div class="grid grid-cols-1 divide-y divide-gray-900  divide-dashed mx-4">
              <HistoryItem
                :index="i"
                v-for="(item, i) in products"
                :key="i"
                :obj="item"
              />
            </div>
          </div>
        </div>
    </section>
    
    <section v-else class="bg-white h-screen divide-y divide-dashed  border-gray-200" >
      <article class="container mx-auto  w-full divide-y ">
        <article CLASS="DAY-FORECAST">
            <h1 class="sans-serif text-3xl ">How to work as AntBundledd</h1>
            <p>If you weren’t familiar with Vue Routing before, hopefully this gives you an idea just how easy it is to get going.  If you are familiar, hopefully this comforts you to see there’s not a whole lot of differences between Vue 2 and Vue 3.</p>
            <p>If you weren’t familiar with Vue Routing before, hopefully this gives you an idea just how easy it is to get going.  If you are familiar, hopefully this comforts you to see there’s not a whole lot of differences between Vue 2 and Vue 3.</p>
        </article>
        <article CLASS="DAY-FORECAST">
            <h1>03 MARCH 2018</h1>
            <p>RAIN.</p>
        </article>
        <article CLASS="DAY-FORECAST">
            <h1>03 MARCH 2018</h1>
            <p>RAIN.</p>
        </article>
      </article>
    </section>
  </div>
</template>

<script>
import HistoryItem from "../components/HistoryItem.vue";
import Product from "../components/ProductUser.vue";
export default {
  name: "User Page",
  props: {
    msg: String,
  },
  components: {
    Product,
    HistoryItem,
  },
  data() {
    return {
      progress: 0,
      doc: false,
      tab: "history",
    };
  },
  computed: {
    products() {
      return this.$store.getters.products;
    },
    isHistory() {
      return this.tab == "history";
    },
  },
  methods() {
    this.$store.commit("addNote", [])
  },
};
</script>

