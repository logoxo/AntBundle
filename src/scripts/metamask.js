import store from '@/store'
import w3 from '@/scripts/w3'
import ct from '@/scripts/const'
export default {
  async login(){
  
    if(window.ethereum){

      // get current network
      const networkId = ct.networkId  
      const currentNetworkId = Number(window.ethereum.networkVersion) 

      // if current network is not equal mainnet switch to mainnet   
      if(networkId !== currentNetworkId){
        await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
          params: [{ chainId: w3.prov.utils.toHex(networkId) }],
        });   
      }
      
      // get accounts
      const accounts  = await window.ethereum.request({
       method: "eth_accounts"
      })

      console.log(accounts)
      // check if user is logged in
      if(accounts.length === 0){
       try{
        const account = await window.ethereum.request({
           method: "eth_requestAccounts"
        })
        
        ccnsole.log(account)

        this.account = account[0]
        //this.$store.dispatch("send", account[0]) 
        //this.$store.dispatch("login") 
        //this.$forceUpdate();
       }catch(error){
         //console.log(error)
         if(error.message === "Already processing eth_requestAccounts. Please wait."){
          store.commit("addNote", [{ type:'Info', text: "Please try to Login by clicking at the Metamask icon"  }])
         }
       }
      }else{

        const save_account  = await window.ethereum.request({
         method: "eth_accounts"
        })
        this.$store.dispatch("send", save_accounts[0]) 
        this.$forceUpdate();
    }
  }

  },
  async setup(currentNetworkId){
        let that = this;
        console.log("================ metamask") 
        // https://ethereum.stackexchange.com/questions/93502/metamask-api-cant-detect-events-connect-and-disconnect-in-react-js 
        // https://ethereum.stackexchange.com/questions/42768/how-can-i-detect-change-in-account-in-metamask
        //  check if user hass been locked out from metamask
        window.ethereum.on("accountsChanged", async function(accounts) {
           
          if(accounts.length === 0){
            //console.log("have been logout") 
            store.dispatch("logout"); 
          }else{
            store.dispatch("send", accounts[0]); 
            store.dispatch("login");  
          }

        });

        // check if user have been changed the metamask network
        window.ethereum.on('chainChanged', function () {
            const networkId = ct.networkId;
            if(networkId !== currentNetworkId){
              window.ethereum.request({
              method: 'wallet_switchEthereumChain',
                params: [{ chainId: w3.prov.utils.toHex(networkId) }],
              });   
            }
        })

        const accounts  = await window.ethereum.request({ method: "eth_accounts" });

        // checks if account exists  
        if(accounts.length !== 0 ){
         const accounts  = await window.ethereum.request({
           method: "eth_accounts"
          })
          store.dispatch("send", accounts[0]);
          store.dispatch("login");  
          that.$forceUpdate;
        }
  }
}
