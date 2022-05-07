<template>
  <div v-if="!loading" class="home pt-8">
     <div class="mx-auto px-4 pb-4">
        <div class="container mx-auto">
          <!--  div class="grid grid-cols-2 gap-4  md:grid-cols-4 md:gap-4 lg:gap-7 xl:gap-8  2xl:gap-8 " -->

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(product, index) in products" :key="index" :class="`${product.kind === 'Product' ? 'item-'+product.id : 'col-span-full' }`">

            <!-- div v-for="(product, index) in products" :key="index" :class="{ 'cols-span-full': product.kind === 'ProductDetail'    }" -->
            <component :is="product.kind" :obj="{ ...product, index:product.id, total: products.length }" />
          </div> 
        </div>
      </div> 
    </div>
  </div>  
  <div v-else class="home pt-8">
    <div class="h-screen flex items-center justify-center ">
    <div class="text-center">

      <div class="flex items-center justify-center"> 
          <img
            id="ant-bundle-logo"
            src="../assets/svg/logo.svg"
            class="w-14 ml-2"
            alt=""
          />
      </div>
      <!-- Caption -->
      <p class="text-4xl font-bold text-gray-700 pt-4 text-center">
      Your payment is being processed. <br /> <span class="text-white">Please do not close this ...</span><br />Check Metamask get more Information.<br />  </p>

      <div id="spinner" class="flex items-center justify-center" > 
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>

    </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Product from '@/components/Product.vue'
import ProductDetail from '@/components/ProductDetail.vue'
import Icons from '@/components/Icons.vue'
import w3 from '@/scripts/w3' 
import call from '@/scripts/funct' 
import Web3 from 'web3'
import store from '@/store'

export default {
  name: 'Home Page',
  props: {
    name:{ 
      type: String,
      default: 'Mike'
    } 
  },
  components: {
   ProductDetail, 
    Product,
    Icons
  },
  data(){
    return {
      // Products
      showProductDetail: true,
      openIndex:null,
      prevImage: null,
      prevRow: null,
      userAddr: "",

      loading:false,

      // metamask
      account: null,
      balance: null,
      perRow: 4,
      colSpan: "cols-span-4"
    }
  },
  computed:{
    currentAddress(){
     return this.$store.getters.address;   
    }, 
    products(){
      return this.$store.getters.products
    }
  },
  created() {
  },
  beforeDestroy() {
     window.removeEventListener("resize", this.setPerRowValue);
  },
  methods:{
    setPerRowValue() {
      // close detail page on resize
      this.closeProductDetail()

      // get numbers per row on screen resize
      if (window.innerWidth < 768) {
        this.perRow = 1;
      } else if (window.innerWidth > 767 && window.innerWidth < 976) {
        this.perRow = 2;
      } else if (window.innerWidth > 975) {
        this.perRow = 4;
      }
      console.log(this.perRow)
    },
    validate_txhash(addr)
    {
      return /^0x([A-Fa-f0-9]{64})$/.test(addr);
    },
    imgUrl(img){
     return require(`@/assets/img/${img}.png`)
      // The path could be '../assets/img.png', etc., which depends on where your vue file is
    },
    async pay(obj){
      const userAddr = window.ethereum.selectedAddress;
      const amoutIncProfit = await call.profitProcent(obj.value,10);
      const ether = Web3.utils.fromWei(obj.value, "ether");
      const gasPrice = await w3.gasPrice(); 
      const gasLimit = 21000;
      const dataInHex = Web3.utils.fromAscii(obj.id.toString())
      const oneEth = await w3.prov.utils.unitMap.ether // returns 1000000000 = 1e9 = 1 gwei
      const estimateGas = await w3.prov.eth.estimateGas({ to: obj.creator , data: dataInHex })

      const gasPriceBN = await w3.prov.utils.toBN(gasPrice)
      const gasLimitBN = await w3.prov.utils.toBN(gasLimit)
      const oneEthBN = await w3.prov.utils.toBN(oneEth) 
      const txFeeBN = gasPriceBN.mul(gasLimitBN)
      const feeInGaiBN = txFeeBN.div(oneEthBN)
      
      const estimateGasBN = w3.prov.utils.toBN(estimateGas) 
      const totalFee = estimateGasBN.add(feeInGaiBN)
      try {
       const result = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: userAddr,
              to: obj.creator,
                gas: totalFee.toString() ,
                value: parseInt(Web3.utils.toWei( ether,"ether")).toString(16),
                data:dataInHex  
            },
          ],
        });
        
        if(this.validate_txhash(result)){

          var that = this;
          const interval = setInterval(function() {
            //console.log("Attempting to get transaction receipt...");
            //that.$store.commit("addNote", [{ type:'Loading', text: "Pending transaction, check Metamask ... "  }])
            that.loading = true;
            that.$parent.$parent.hiddeHeader(true)
            w3.prov.eth.getTransactionReceipt(result, mount);
          }, 1000);
        
           const mount =  function(err, rec) {
            if (rec) {
              console.log(result)

              that.$parent.$parent.hiddeHeader(false)
              that.loading = false;
              that.$store.commit("addNote", [{ type:'Success', text: "Transaction was successful send"  }])
              store.dispatch("txDB", { txhash: result }) 
              //that.$forceUpdate();
              //store.dispatch("loadDB");
              clearInterval(interval);
            }
          }

          //console.log("done")
          this.$forceUpdate();

        }else{
          this.loading = false;
          console.log("wrong transactioN")
          this.$store.commit("addNote", [{ type:'Error', text: "Wrong transaction hash"  }])
        }
      } catch (error) { 
        //console.log(error)

        this.$parent.$parent.hiddeHeader(false)
        this.loading = false;
        if(error.code === 4001){ 
          this.$store.commit("addNote", [{ type:'Info', text: "You didn't send a transaction"  }])
        }else{ 
          this.$store.commit("addNote", [{ type:'Error', text: "Please verify your transaction"  }])
        }
      }
      
    },
    closeProductDetail(){
      //console.log("========== closeProductDetail =============")
      this.$store.dispatch("remove") 
      
      this.showProductDetail = !this.showProductDetail;
      //console.log(this.products)
      this.prevImage = null;
      this.prevRow = null;
    },
    appendProductDetail(rowId,itemId,obj){
      //console.log("========= appendProductDetail =============")
      //console.log("append to index: ", index)
      const objDetail = { ...obj, kind: "ProductDetail" }

      this.$store.dispatch("update",{ 
       index : rowId,
       obj: objDetail
      }) 
      this.prevImage = itemId;
      this.prevRow = rowId; 
      this.showProductDetail = !this.showProductDetail;
    },
    async productSetup(obj, evt){
      const imageId = obj.id;
      const perRow = this.perRow;
      let appendtoIndex = 0;

      // if the same item was clicked close the detail page
      if(this.prevImage === imageId ){
        this.closeProductDetail();
        return; 
      }
  

      // gets the last item of the row but on mobile it's not needed
      if(perRow !== 1 ){   
        for( let i = imageId; i <= obj.total; i++){
          //console.log(`${i} % ${perRow} = ${( i % perRow)}`)
          if(i % perRow === 0){
            appendtoIndex = i;
            break;
          }else{
            appendtoIndex = obj.total;
          }
        }
      }else{ 
        appendtoIndex = imageId;
        // gets the row number to append the detail page 
      }

      // show and hide detail page
      if(this.showProductDetail){
        // append detail page
        this.appendProductDetail(appendtoIndex,imageId, obj);
      } else{ 
        // hide detail page if open
        this.closeProductDetail()
        // append the clicked item detail
        this.appendProductDetail(appendtoIndex,imageId, obj); 
      }
    },
  },
  async mounted(){ 
    window.addEventListener("resize", this.setPerRowValue);
    this.$store.commit("addNote", [])
 
    
    console.log(this.$route.query)
  
  }
}
</script>

