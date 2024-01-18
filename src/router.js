import { createRouter, createWebHistory } from "vue-router";

import homePage  from './pages/HomePage.vue';
import ticketPage from './pages/TicketPage.vue';



const router =  createRouter({

    history :
    
     createWebHistory(),
 
     routes : [
 
         {
             
             path : '/' ,
 
             name :  'home' ,
 
             component : homePage ,
 
         },

         {
             
            path : '/tickets/:id' ,

            name :  'ticket' ,

            component : ticketPage ,

            // props : route=>({
            //     flight : 
            // })
            // ,

        },
  
     ]
 
 });
 
 export {router} ;