<script>

import axios from 'axios';
export default {
 
  components: { 
   
  },
  data() {
    return {
      result:null,
      ticketsQuantity:0,
      tickets:[],
      
     
    
    };
  },
  methods: {

    getFlight(){

      this.result=null

      axios.get('http://127.0.0.1:8000/api/flight/'+ this.$route.params.id)
      .then(response=>{
              this.result=response.data.flight
              console.log(this.result)
      })
      .catch(error=>{
          console.log(error)
      })
    },
  
    populateTickets(){
      if(this.ticketsQuantity>this.tickets.length){

        let ticket={
          firstName:'',
          surname:'',
          dateOfBirth:'',
          taxCode:''
        }

        this.tickets.push(ticket)
      }

      else if(this.ticketsQuantity<this.tickets.length){

        this.tickets.pop()

      }
    },

    postTicketReservation(){

      
      for(let i =0;i<this.tickets.length;i++ ){

        if(this.tickets[i].firstName.trim().length==0 || this.tickets[i].surname.trim().length==0 || this.tickets[i].dateOfBirth.trim().length==0 ){
          this.tickets.splice(i,1)
        }

      }

      axios.post('http://127.0.0.1:8000/api/flight/'+this.$route.params.id+'/reservation/submit'
                ,this.tickets
                , {headers:{
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',

                          }})
      .then(response=>{

        console.log(response.data)

        return router.push({name : ''})
      })
      .catch(err=>{
        if(err){
     
          console.log(err)
          // return this.dbErrors=err.response.data.errors;

        }  
      })
    }
  
  },
  computed:{
    
  },
  created(){
    this.getFlight();
  }


};
</script>

<template>
  
  <form action="">

    <label for="num-of-tickets">
      how many tickets you want to reserve?
    </label>

    <input @change="populateTickets()" type="number" :max="result.available_seats" :placeholder="'max('+ result.available_seats+')'"  name="num-of-tickets" id="num-of-tickets" v-model="ticketsQuantity">

  </form>

  <form @submit.prevent="postTicketReservation()" >
    <div v-for="(ticket,key) in tickets">

      <h3>
        
        Ticket {{ key+1 }} of {{ tickets.length }}

      </h3>

      <label :for="'first-name-' +(key+1) ">
        name
      </label>

      <input type="text" name="first-name" :id="'first-name-' + (key+1) " v-model="ticket.firstName" >

      <label :for="'surname-'+(key+1)">
        surname
      </label>

      <input type="text" name="surname" :id="'surname-'+ (key+1)" v-model="ticket.surname">

      <label :for="'birthdate-'+ (key+1)">
        date of birth
      </label>

      <input type="date" name="birthdate" :id="'birthdate-'+(key+1)" v-model="ticket.dateOfBirth">

      <label :for="'tax-code-'+ (key+1)">
        tax code
      </label>

      <input type="text" name="tax-code" :id="'tax-code-'+(key+1)" v-model="ticket.taxCode">

    </div>

    <input v-if="tickets.length>0" type="submit">
    
  </form>

  <div>
    {{tickets}}
  </div>
    
</template>

<style lang="scss">

</style>
