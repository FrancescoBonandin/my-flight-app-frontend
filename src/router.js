import { createRouter, createWebHistory } from "vue-router";

import homePage  from './pages/HomePage.vue';



const router =  createRouter({

    history :
    
     createWebHistory(),
 
     routes : [
 
         {
             
             path : '/' ,
 
             name :  'home' ,
 
             component : homePage ,
 
         },
  
     ]
 
 });
 
 export {router} ;