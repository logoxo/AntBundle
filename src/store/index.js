import { createStore } from 'vuex'
import call from '@/scripts/request'
import w3 from '@/scripts/w3' 
export default createStore({
  state: {
    addr:3939302292032932092,
    closedList:[],
    notify:[],
    addrList:[],
    products:[],
  },
  getters:{
    address(state){
      return state.addr;
    },
    auth(state){
      return !!state.addr;
    },
    addrList(state){
      return state.addrList;
    },
    notify(state){
      return state.notify[0];
    },
    allProducts(state){ 
      return state.products;
    },
    products(state){
      if(!state.products.length){
        return[];
      }
       return state.products;
      // return state.products.filter( p => p.user_count <  Number(p.goal))
    },
  },
  mutations: {
   addNote(state, payload){
    state.notify = [...payload]; 
   }, 
   closedBundels(state, payload){
     state.closedList = [...payload];
   },
   addAddrList(state, payload){
     state.addrList = [...payload];
   },
   addProducts(state, payload){
     if(payload.hasOwnProperty("update")){
      state.products = [...payload.update];
     }
     if(payload.hasOwnProperty("insert")){
      state.products.push(payload.insert);
     }
   },
   addProductDetail(state,payload){
     state.products.splice(payload.index,0,payload.obj);
   },
   removeProductDetial(state,payload){ 
    state.products.splice(payload,1);
   },
   clearProducts(state){
    state.products = []; 
   },
   addAddr(state, payload){
    state.addr = payload;
   }, 
    removeAddr(state){
      state.addr = null;
    }
  },
  actions: {
    remove(context){  
      const ProductDetailIndex = context.getters.products.findIndex(x => x.kind === "ProductDetail")
      
      // remove the detail page if it's exists
      if(0 < ProductDetailIndex) context.commit('removeProductDetial', ProductDetailIndex );
    },
    update(context, payload){
      //console.log(payload)
      //console.log("Upade ++++++++++++++++++++++++++++++")
      ///console.log( "index " + payload.index)
      //console.log( "id " + payload.obj.id)
      //const clickedProductInddex = context.getters.products.findIndex(x => && x.id === payload.index )
      //console.log(clickedProductInddex)
      if(context.getters.products.length <= payload.index){
        context.commit('addProducts', { insert : payload.obj } )
      }else{
        console.log("push")
        context.commit('addProductDetail',{ index: payload.index , obj: payload.obj });
        //this.products.splice( index,0, objDetail)
      }
    },
    closeFunding(context, payload){
      payload.getPastEvents('CloseFunding', { fromBlock: 0, toBlock: 'latest' }, 
        function(error, events){ 
          console.log(events);
        })
        .then(function(events){ 
            var closed = [];
            for(let i = 0; i < events.length; i++ ){
              closed.push(events[i].returnValues.id)
            }
          context.commit('closedBundels', closed )
        })
    }, 
    send(context,payload){
      context.commit('addAddr', payload)
      //localStorage.setItem('wallet', payload);
    },
    async login({getters}){
      const resp = await call.req({ meth:"post" , url: 'login', data: { address: getters.address } })
      console.log(resp)
    },
    logout(context){
      context.commit('removeAddr')  
      //router.replace('/launch') 
    },
    async loadDB({commit,dispatch,getters, state}){
      const array = [
        {
          id: 1,
          creator: "0x0c22f933b904E3b4edB25E088b55892f29c4D313",
          goal: "5",
          image_addr: "0xD840354497Df85E84107A0A7b0EdED573349074C",
          image_url:
            "https://rarible.mypinata.cloud/ipfs/QmNM9E9SdYaAuDzcrddBfcmNxnDSNgVdiMDVWFKDsF9QJT/image.jpeg",
          image_id: "1",
          platform: ["rarible", "opensea"],
          users: "0",
          value: "20000000000000000",
          addr_list: [
            "0x6635F83421Bf059cd8111f180f0727128685BaE4",
            "0x0f488c370708b4250a253df57193df2ff731ca3d",
            "0x6635f83421bf059cd8111f180f0727128685bae4",
            "0x2ddef5a127989f7060f72beb6bc19332d39bd61b",
            "0x6635F83421Bf059cd8111f180f0727128685BaE4",
            "0x0f488c370708b4250a253df57193df2ff731ca3d",
            "0x6635f83421bf059cd8111f180f0727128685bae4",
            "0x2ddef5a127989f7060f72beb6bc19332d39bd61b",
            "0x6635F83421Bf059cd8111f180f0727128685BaE4",
            "0x0f488c370708b4250a253df57193df2ff731ca3d",
            "0x6635f83421bf059cd8111f180f0727128685bae4",
            "0x2ddef5a127989f7060f72beb6bc19332d39bd61b",
          ],
          buy_sell_tx: ["0x"],
          open: true,
          user_count: 4,
          sign: "0x43934cea081be50f0944739bfaea2fec7c66a40d7c9b28cd3029d533fc8bf3fd504196749c8e2a6a9b9769b8818b1c21d0c1fa7ec8bd82539f6c94ff82e309111c",
        },
        {
          id: 2,
          creator: "0x0c22f933b904E3b4edB25E088b55892f29c4D313",
          goal: "5",
          image_addr: "0xD840354497Df85E84107A0A7b0EdED573349074C",
          image_url:
            " https://lh3.googleusercontent.com/blVPscK8nh9vGN-dK5VesUAq4y4GBASRwSu30CcMdx1vFP09bge-0nVU2I3XinWcx0jtCYczfWOG723ilPFBh57_bmliPefxJI_i=w600",
          image_id: "1",
          platform: ["rarible", "opensea"],
          users: "0",
          value: "20000000000000000",
          addr_list: [
            "0x6635F83421Bf059cd8111f180f0727128685BaE4",
            "0x0f488c370708b4250a253df57193df2ff731ca3d",
            "0x6635f83421bf059cd8111f180f0727128685bae4",
            "0x2ddef5a127989f7060f72beb6bc19332d39bd61b",
            "0x6635F83421Bf059cd8111f180f0727128685BaE4",
            "0x0f488c370708b4250a253df57193df2ff731ca3d",
            "0x6635f83421bf059cd8111f180f0727128685bae4",
            "0x2ddef5a127989f7060f72beb6bc19332d39bd61b",
            "0x6635F83421Bf059cd8111f180f0727128685BaE4",
            "0x0f488c370708b4250a253df57193df2ff731ca3d",
            "0x6635f83421bf059cd8111f180f0727128685bae4",
            "0x2ddef5a127989f7060f72beb6bc19332d39bd61b",
          ],
          buy_sell_tx: ["0x"],
          open: true,
          user_count: 4,
          sign: "0x43934cea081be50f0944739bfaea2fec7c66a40d7c9b28cd3029d533fc8bf3fd504196749c8e2a6a9b9769b8818b1c21d0c1fa7ec8bd82539f6c94ff82e309111c",
        },
        {
          id: 3,
          creator: "0x0c22f933b904E3b4edB25E088b55892f29c4D313",
          goal: "5",
          image_addr: "0xD840354497Df85E84107A0A7b0EdED573349074C",
          image_url:
            "https://lh3.googleusercontent.com/qABj2qfx79c4ecaYQsol-B9CCr-_vSX38_ftORtX-eCwVPO-ZVteyjMVNrWoTZDNy2M3PGFeYXtDo_fLBMcGAghmIQxF1jic9IZQ=w600",
          image_id: "1",
          platform: ["rarible", "opensea"],
          users: "0",
          value: "20000000000000000",
          addr_list: [
            "0x6635F83421Bf059cd8111f180f0727128685BaE4",
            "0x0f488c370708b4250a253df57193df2ff731ca3d",
            "0x6635f83421bf059cd8111f180f0727128685bae4",
            "0x2ddef5a127989f7060f72beb6bc19332d39bd61b",
            "0x6635F83421Bf059cd8111f180f0727128685BaE4",
            "0x0f488c370708b4250a253df57193df2ff731ca3d",
            "0x6635f83421bf059cd8111f180f0727128685bae4",
            "0x2ddef5a127989f7060f72beb6bc19332d39bd61b",
            "0x6635F83421Bf059cd8111f180f0727128685BaE4",
            "0x0f488c370708b4250a253df57193df2ff731ca3d",
            "0x6635f83421bf059cd8111f180f0727128685bae4",
            "0x2ddef5a127989f7060f72beb6bc19332d39bd61b",
          ],
          buy_sell_tx: ["0x"],
          open: true,
          user_count: 4,
          sign: "0x43934cea081be50f0944739bfaea2fec7c66a40d7c9b28cd3029d533fc8bf3fd504196749c8e2a6a9b9769b8818b1c21d0c1fa7ec8bd82539f6c94ff82e309111c",
        },
        {
          id: 4,
          creator: "0x0c22f933b904E3b4edB25E088b55892f29c4D313",
          goal: "5",
          image_addr: "0xD840354497Df85E84107A0A7b0EdED573349074C",
          image_url:
            "https://lh3.googleusercontent.com/764ZFSRj8X2dIRDPscNaYhGlqO1hHseeDKSvUSkziKex4z4fGOYm6D3w2SmSqTbTkJBVNw3_UghaHR_Hdm0UJHg=w600",
          image_id: "1",
          platform: ["rarible"],
          users: "0",
          value: "20000000000000000",
          addr_list: [
            "0x6635F83421Bf059cd8111f180f0727128685BaE4",
            "0x0f488c370708b4250a253df57193df2ff731ca3d",
            "0x6635f83421bf059cd8111f180f0727128685bae4",
            "0x2ddef5a127989f7060f72beb6bc19332d39bd61b",
            "0x6635F83421Bf059cd8111f180f0727128685BaE4",
            "0x0f488c370708b4250a253df57193df2ff731ca3d",
            "0x6635f83421bf059cd8111f180f0727128685bae4",
            "0x2ddef5a127989f7060f72beb6bc19332d39bd61b",
            "0x6635F83421Bf059cd8111f180f0727128685BaE4",
            "0x0f488c370708b4250a253df57193df2ff731ca3d",
            "0x6635f83421bf059cd8111f180f0727128685bae4",
            "0x2ddef5a127989f7060f72beb6bc19332d39bd61b",
          ],
          buy_sell_tx: ["0x"],
          open: true,
          user_count: 5,
          sign: "0x43934cea081be50f0944739bfaea2fec7c66a40d7c9b28cd3029d533fc8bf3fd504196749c8e2a6a9b9769b8818b1c21d0c1fa7ec8bd82539f6c94ff82e309111c",
        },
        {
          id: 5,
          creator: "0x42b9a4143a9B61Fc60dbBe88152abc4452D60f96",
          goal: "5",
          image_addr: "0xD840354497Df85E84107A0A7b0EdED573349074C",
          image_url:
            "https://lh3.googleusercontent.com/jZkm7HPA0Q5VXvFYHdvXoptmszGfIJ2Y89kAbSmluGahK-IrbJQH10z-JSk6-lHU5-I79V_2lYrzj4ULpG5aS3Dt=w600",
          image_id: "1",
          platform: ["rarible", "opensea"],
          users: "0",
          value: "20000000000000000",
          addr_list: [],
          buy_sell_tx: ["0x"],
          open: true,
          user_count: 1,
          sign: "0x468ec7ddf632179708e94d566f7e90a8944dd338eab238d618dc45f4d75c40aa22b886059d40068dd77dcd1f24d6c2c9cc274014777693bdea45948bc172c5251b",
        },
        {
          id: 6,
          creator: "0x0c22f933b904E3b4edB25E088b55892f29c4D313",
          goal: "5",
          image_addr: "0xD840354497Df85E84107A0A7b0EdED573349074C",
          image_url:
            "https://lh3.googleusercontent.com/dkaedqx1_xYRTWlPM41MJg_TdvnG2Vmp8Iuy2rflLR0burvQfJ32XUhzDeOK73su6YiFczADHXNfybx9a0ZTzkADTuuHxLAcHSsOpzE=w600",
          image_id: "1",
          platform: ["rarible"],
          users: "0",
          value: "20000000000000000",
          addr_list: [
            "0x6635F83421Bf059cd8111f180f0727128685BaE4",
            "0x0f488c370708b4250a253df57193df2ff731ca3d",
            "0x6635f83421bf059cd8111f180f0727128685bae4",
            "0x2ddef5a127989f7060f72beb6bc19332d39bd61b",
          ],
          buy_sell_tx: ["0x"],
          open: true,
          user_count: 4,
          sign: "0x43934cea081be50f0944739bfaea2fec7c66a40d7c9b28cd3029d533fc8bf3fd504196749c8e2a6a9b9769b8818b1c21d0c1fa7ec8bd82539f6c94ff82e309111c",
        },
        {
          id: 7,
          creator: "0x0c22f933b904E3b4edB25E088b55892f29c4D313",
          goal: "5",
          image_addr: "0xD840354497Df85E84107A0A7b0EdED573349074C",
          image_url:
            "https://lh3.googleusercontent.com/rq_jOoBJu2wKzgtkmZHEztnG7CpNpESOEg0SQwVk0dKWTHo71s2lAnQkvaBbR13psT7NyYE06YUponALStaTD8FTls21MXSX6FgvnA=w600",
          image_id: "1",
          platform: ["rarible"],
          users: "0",
          value: "20000000000000000",
          addr_list: [
            "0x6635F83421Bf059cd8111f180f0727128685BaE4",
            "0x0f488c370708b4250a253df57193df2ff731ca3d",
            "0x6635f83421bf059cd8111f180f0727128685bae4",
            "0x2ddef5a127989f7060f72beb6bc19332d39bd61b",
          ],
          buy_sell_tx: ["0x"],
          open: true,
          user_count: 4,
          sign: "0x43934cea081be50f0944739bfaea2fec7c66a40d7c9b28cd3029d533fc8bf3fd504196749c8e2a6a9b9769b8818b1c21d0c1fa7ec8bd82539f6c94ff82e309111c",
        },
        {
          id: 8,
          creator: "0x0c22f933b904E3b4edB25E088b55892f29c4D313",
          goal: "5",
          image_addr: "0xD840354497Df85E84107A0A7b0EdED573349074C",
          image_url:
            "https://lh3.googleusercontent.com/M5bg7rfMch1_oeQmXdRCWEX0jwvaYCWCu5Uc4jSaqtrFKW18mUKKI8klL6FlDeOyF9pP7eZ5nvqaRlyoiwNl3GK6aDKCP3Xd6FbF7w=w600",
          image_id: "1",
          platform: ["rarible"],
          users: "0",
          value: "20000000000000000",
          addr_list: [
            "0x6635F83421Bf059cd8111f180f0727128685BaE4",
            "0x0f488c370708b4250a253df57193df2ff731ca3d",
            "0x6635f83421bf059cd8111f180f0727128685bae4",
            "0x2ddef5a127989f7060f72beb6bc19332d39bd61b",
          ],
          buy_sell_tx: ["0x"],
          open: true,
          user_count: 4,
          sign: "0x43934cea081be50f0944739bfaea2fec7c66a40d7c9b28cd3029d533fc8bf3fd504196749c8e2a6a9b9769b8818b1c21d0c1fa7ec8bd82539f6c94ff82e309111c",
        },
        {
          id: 9,
          creator: "0x0c22f933b904E3b4edB25E088b55892f29c4D313",
          goal: "5",
          image_addr: "0xD840354497Df85E84107A0A7b0EdED573349074C",
          image_url:
            "https://lh3.googleusercontent.com/YD0xvTqayiTFjZGcmRXCoIR6YHLR1m36B1sdU2q5M5U6sP6hzNAfPcwtgi_KAcYtNUZ0WPnU1WbfQblOn4tsMz9mJpbgdvhr6X8g=w600",
          image_id: "1",
          platform: ["rarible"],
          users: "0",
          value: "20000000000000000",
          addr_list: [
            "0x6635F83421Bf059cd8111f180f0727128685BaE4",
            "0x0f488c370708b4250a253df57193df2ff731ca3d",
            "0x6635f83421bf059cd8111f180f0727128685bae4",
            "0x2ddef5a127989f7060f72beb6bc19332d39bd61b",
          ],
          buy_sell_tx: ["0x"],
          open: true,
          user_count: 5,
          sign: "0x43934cea081be50f0944739bfaea2fec7c66a40d7c9b28cd3029d533fc8bf3fd504196749c8e2a6a9b9769b8818b1c21d0c1fa7ec8bd82539f6c94ff82e309111c",
        },
        {
          id: 10,
          creator: "0x42b9a4143a9B61Fc60dbBe88152abc4452D60f96",
          goal: "5",
          image_addr: "0xD840354497Df85E84107A0A7b0EdED573349074C",
          image_url:
            "https://lh3.googleusercontent.com/E1n-BN3FAH6bEH0JekhtrPvTuqwUMmjHwbmeAd662L4v6i17o6LbkTO4_hILuLEhjh5Zv5vXYLDUtWN52Z79XK_oFUQPYXzvgeEGgA=w600",
          image_id: "1",
          platform: ["rarible"],
          users: "0",
          value: "20000000000000000",
          addr_list: [],
          buy_sell_tx: ["0x"],
          open: true,
          user_count: 1,
          sign: "0x468ec7ddf632179708e94d566f7e90a8944dd338eab238d618dc45f4d75c40aa22b886059d40068dd77dcd1f24d6c2c9cc274014777693bdea45948bc172c5251b",
        },
      ];
      let box = [];
      for (let i = 0; i < array.length; i++) {
        // console.log(array[i]);
        box.push({ ...array[i], front_id: i ,  kind: "Product" });
        commit("addProducts", { update: box });
      }
      /*
      const resp = await call.req({ meth:"get" , url: 'bundels' })
      let bundelsArr = [];
      console.log(resp)
      if(resp === undefined){
        return bundelsArr;
      }
      for(let i=0; i < resp.data.length; i++){
        const bundel = resp.data[i] 
        let bundel_obj = resp.data[i]
        const user_count = bundel_obj.user_count
        const signature = bundel_obj.sign
        delete bundel_obj["sign"] 
        delete bundel_obj["user_count"] 
        bundel_obj["tname"] = "bundels"
        bundel_obj["id"] = bundel.id.toString()

        const text = JSON.stringify(bundel_obj)
        const secret = w3.prov.utils.sha3(text)
      
        const address = await w3.prov.eth.personal.ecRecover(secret, signature)
       
        const response = await call.req({ meth:"get" , url: 'check_addr/' + address })
        bundelsArr.push({ ...bundel, user_count: user_count, kind: "Product"  }) 
        if(response.data){
          commit('addProducts',{ update: bundelsArr}  )
        }else{
          // commit but it's nedd to be verfied
          // commit('addProducts', { ...bundel, kind: "Product"  } )
          console.log("some strange things happend here") 
        }
      }
      */ 
    },
    async updateDB({commit,dispatch,getters, state}, payload){
      const resp = await call.req({ meth:"post" , url: '', data: payload })
      console.log(resp)
    },
    async txDB({commit,dispatch,getters, state}, payload){
      console.log(payload)
      const resp = await call.req({ meth:"post" , url: 'tx', data: payload })
      
      if(resp.data){
        dispatch("loadDB")
      }
    },
  },
  modules: {
  }
})


