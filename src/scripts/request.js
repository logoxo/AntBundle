import axios from "axios";    
const baseUrl = "http://127.0.0.1:8000/";
const version = "v1/"
const mainUrl = baseUrl + version 
// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";
    
export default {
  async req(obj){
    switch(obj.meth){
        case "post":
          try{
            const resp = await axios({
              method: obj.meth ,
              url: mainUrl + obj.url,
              data:obj.data,
              //headers: { 'Content-Type': 'application/json' }
            })      
            return resp;
        
           } catch (error) {
            console.log(error.response); // this is the main part. Use the response property from the error object
          }
          break;

        case "get":
          try{
            const resp = await axios({
              method: obj.meth ,
              url: mainUrl + obj.url ,
              //headers: { 'Content-Type': 'application/json' }
            })      
            //console.log(resp)
            return resp;
        
           } catch (error) {
             console.log(error); // this is the main part. Use the response property from the error object
             //return error.response
          }
          break;
        default:
          console.log('please use put, patch, put get. '+ obj.meth + ' does not exist' );
      }
  }
  
};
