<template>
  <div class="antialiased font-sans flex">
    <!-- This empty div is only for demo purposes and it's used so you can close the menu on a touchscreen device. Normally you'd handle it differently by not using hover states on mobile, but by using real clicks. -->
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
              <span
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
              </span>
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
      isVisible: false,
      items: [
        {
          social: "twitter",
          title: "Twitter",
          text: "",
          hashtags: "#antbundle",
          image : "",
          href: "https://twitter.com/intent/tweet",
          url: "https://antbundle",
        },
        {
          social: "facebook",
          title: "Facebook",
          text: "",
          image : "",
          hashtags: "#antbundle",
          href: "http://www.facebook.com/sharer.php",
          url: "https://antbundle.io",
        },
        {
          social: "pinterest",
          text: "",
          image : "",
          title: "Pinterest",
          media: "https://codyhouse.co/app/assets/img/social-sharing-img-1.jpg",
          description: "Description for my Pinterest share",
          hashtags: "#antbundle",
          href: "http://pinterest.com/pin/create/button",
          url: "https://antbundle.io",
        },
      ],
    };
  },
  methods: {
    share(item) { 

      let text="", title = `Bundel team up with us ${item.hashtags}`
      let remainUser = (Number(this.info.goal) - Number(this.info.user_count))
      if(remainUser < 5){
         text = `We only need ${remainUser} user to close the Bundle. Please hurry up.`
      }else{ 
         text = `We need ${remainUser} user to close the Bundle. Please hurry up.`
      }

      document.head.querySelector('meta[name="twitter:title"]').content = title 
      document.head.querySelector('meta[name="twitter:description"]').content = text 
      document.head.querySelector('meta[name="twitter:image:src"]').content = this.info.image_url
      //console.log(document)
      const twitterLink = item.href + "?text=" + title
      window.open( twitterLink , "_blank");
    },
    getSocialUrl(button, social) {
      var params = this.getSocialParams(social);
      var newUrl = "";
      for (var i = 0; i < params.length; i++) {
        var paramValue = button.getAttribute("data-" + params[i]);
        if (params[i] == "hashtags")
          paramValue = encodeURI(paramValue.replace(/\#| /g, ""));
        if (paramValue) {
          social == "facebook"
            ? (newUrl = newUrl + "u=" + encodeURIComponent(paramValue) + "&")
            : (newUrl =
                newUrl +
                params[i] +
                "=" +
                encodeURIComponent(paramValue) +
                "&");
        }
      }
      if (social == "linkedin") newUrl = "mini=true&" + newUrl;
      return button.getAttribute("href") + "?" + newUrl;
    },
    getSocialParams(social) {
      var params = [];
      switch (social) {
        case "twitter":
          params = ["text", "hashtags"];
          break;
        case "facebook":
        case "linkedin":
          params = ["url"];
          break;
        case "pinterest":
          params = ["url", "media", "description"];
          break;
        case "mail":
          params = ["subject", "body"];
          break;
      }
      return params;
    },
  },
};
</script>


