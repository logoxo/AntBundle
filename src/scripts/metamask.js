import store from '@/store'
import w3 from '@/scripts/w3'

export default {

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
            const networkId = process.env.VUE_APP_NETWORK;
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
