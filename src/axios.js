// it is a fetching library 
import axios from "axios"

const instance = axios.create({
    // api ni hai toh ... kr lenge
    // baseURL: "https://jsonplaceholder.typicode.com/posts",
    baseURL : "./functions/index.js",
    //THE API URL (cloud function) URL
});

export default instance;