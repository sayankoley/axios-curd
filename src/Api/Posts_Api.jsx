import axios from "axios";

 const Api =axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
 })

export const get_Posts= ()=>{
    return Api.get("/posts")
 }
 export const delete_Posts=(id)=>{
    return Api.delete("/posts/id")
 }
 export const patchPosy=(id,val)=>{
    return Api.put(`/posts/${id}`,val)

 }
 export const addDatas=(val)=>{
   return Api.post(`/posts`,val)
 }