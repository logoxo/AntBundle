<template>
 <div v-if="navigatorShare">
    <button >
      <img
        src="../assets/svg/share.svg"
        class="xl:w-20 xl:h-20 w-12 h-12"
        alt=""
        @click="navShare(item)"
      />
    </button>
  </div>
  <div v-else class="antialiased font-sans flex">
    <div
      class="relative inline-block"
      @click="isVisible = !isVisible"
      @keydown.enter="isVisible = !isVisible"
      @mouseleave="isVisible = false"
    >
      <button
        type="button"
        class="
          inline-flex
          items-center
          justify-between
          px-2
          py-1
          font-medium
          text-gray-700
          transition-all
          duration-500
          rounded-md
          focus:outline-none focus:text-brand-900
          sm:focus:shadow-outline
          mt-4
          md:mt-0
        "
      >
        <img
          src="../assets/svg/share.svg"
          class="xl:w-20 xl:h-20 w-12 h-12"
          alt=""
        />
      </button>
      <transition
        enter-active-class="transition duration-300 ease-out transform"
        enter-class="-translate-y-3 scale-95 opacity-0"
        enter-to-class="translate-y-0 scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in transform"
        leave-class="translate-y-0 opacity-100"
        leave-to-class="-translate-y-3 opacity-0"
      >
        <div v-show="isVisible" class="absolute z-20 bottom-1 left-14">
          <div
            class="
              relative
              py-1
              bg-white
              border border-gray-200
              rounded-md
              shadow-xl
            "
          >
            <div
              class="
                absolute
                bottom-0
                w-4
                h-4
                left-1.5
                origin-center
                transform
                rotate-45
                translate-x-5
                -translate-y-2
                bg-white
                border-t border-l border-gray-200
                rounded-sm
                pointer-events-none
              "
            ></div>
            <div class="relative ">
              <a
                v-for="(item, i) in items"
                :key="i"
                class="
                  block
                  w-full
                  px-4
                  py-2
                  font-medium
                  text-gray-700
                  whitespace-no-wrap
                  hover:bg-gray-100
                  focus:outline-none
                  hover:text-gray-900
                  focus:text-gray-900 focus:shadow-outline
                  transition
                  duration-300
                  ease-in-out
                "
                @click="share(item)"
              >
                {{ item.title }}
              </a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {
      navigatorShare: false,
      isVisible: false,
      items: [
        {
          social: "twitter",
          title: "Twitter",
          text: "",
          hashtags: ["%23antbundle", "%23AntGame"],
          image : "",
          href: "https://twitter.com/intent/tweet",
          url: "https://antbundle.io",
        },
        {
          social: "reddit",
          title: "Reddit",
          text: "",
          image : "",
          hashtags: ["%23antbundle", "%23AntGame"],
          href: "https://www.reddit.com/submit",
          url: "https://antbundle.io",
        },
        {
          social: "telegram",
          title: "Telegram",
          text: "",
          image : "",
          hashtags: ["%23antbundle", "%23AntGame"],
          href: "http://t.me/share/url",
          url: "https://antbundle.io",
        },
      ], 
      title : "Bundle up with us ", 
      remainUser: (Number(this.info.goal) - Number(this.info.user_count)),
      text1 : "We only need " + this.remainUser + " user to close the Bundle. Please hurry up.",
      text2 : "We need" + this.remainUser + "user to close the Bundle. Please hurry up."

    };
  },
  methods: {
    navShare(){
      let text , url = this.items[0].url + "?key=" + this.info.image_addr;
      let title = this.title + this.items[0].hashtags.join(" ");

      if(this.remainUser < 5){
         text = this.text1;
      }else{ 
         text = this.text2;
      }

      const shareData = { title: title, text: text, url: this.items[0].url }  
      navigator.share(shareData)
    },
    share(item) { 
      let link, text, url = item.url + "?key=" + this.info.image_addr;
      let title = this.title + this.items[0].hashtags.join(" ");

      if(this.remainUser < 5){
         text = this.text1;
      }else{ 
         text = this.text2;
      }

      //open graph metatag should not get update if twitter is selected
      if(item.social !== "twitter"){ 
        document.head.querySelector('meta[property="og:type"]').content = "article";
        document.head.querySelector('meta[property="og:title"]').content = title;
        document.head.querySelector('meta[property="og:description"]').content = text;
        document.head.querySelector('meta[property="og:image"]').content = this.info.image_url;
      }

      switch(item.social) {
        case "twitter":
          document.head.querySelector('meta[name="twitter:title"]').content = title;
          document.head.querySelector('meta[name="twitter:description"]').content = text; 
          document.head.querySelector('meta[name="twitter:image"]').content = this.info.image_url;
          let twitterText = text + " " + item.hashtags.join(' ') ;
          link = `${item.href}?url=${url}&text=${twitterText}`;
          break;
        case "telegram":
          // Facebook, discord, pinterest, ... card share
          link = `${item.href}?url=${url}&${text}`;
          console.log(document.head);
          break;
        case "reddit": 
            link = `${item.href}?url=${url}&title=${title}`;
          break;
      }
      window.open( link ); 
    },
  },
  mounted(){
    if(navigator.share !== undefined){
      this.navigatorShare=true      
    }else{
      this.navigatorShare=false     
    }
    console.log(navigator.share) 
  }
};
</script>


