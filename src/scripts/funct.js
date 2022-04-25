import w3 from '@/scripts/w3'
import { theme } from '@/../tailwind.config';
export default {
  fourAvatar(list, number ){
    if(number === undefined){
      number = 4
    }
    return list.filter(( avatar  ,idx) => idx < number)
  },
 colorAddr(address){
    let str = address.toString() 
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
 },
  kether(number){
    const ether = w3.prov.utils.fromWei( number, 'ether')
    return parseFloat(ether).toFixed(3);
  },
  sellPrice(quantity,goal){
    const nftPrice = (Number(quantity) * Number(goal)) * 2
    const ether = w3.prov.utils.fromWei( nftPrice.toString(), 'ether')
    return parseFloat(ether).toFixed(3);
  },
  nftPrice(quantity, goal){
    const nftPrice = (Number(quantity) * Number(goal) )
    const ether = w3.prov.utils.fromWei( nftPrice.toString(), 'ether')
    return parseFloat(ether).toFixed(3);
  },
  profitProcent(value,porzent){
    const percentage = 100 / porzent
    return Number(value) +  Number( value / percentage);
  },
  currentBreakpoints() {
    let perRow = 4;

    if (window.innerWidth < 768) {
      perRow = 1;
    } else if (window.innerWidth > 768 && window.innerWidth < 976) {
      perRow = 2;
    } else if (window.innerWidth > 975) {
      perRow = 4;
    }
    return 4
    //.find((key) => window.innerWidth > theme.screens[key]);
    //return Object.keys(theme.screens).find((key) => window.innerWidth > theme.screens[key]);
  }
}

