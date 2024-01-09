<script>

    import axios from 'axios';

    export default {

        data(){

            return{



                airports:null,
                departureAirport:null,
                arrivalAirport:null,
                departureDate:null,
                results:null
            }

        },
        methods:{

            isParamsOk(){

                if((this.departureAirport=='departure airport'||this.departureAirport==null)
                || (this.arrivalAirport=='arrival airport'||this.arrivalAirport==null)) {
                    console.log(this.departureAirport, '|', this.arrivalAirport)
                    return true
                }

                else{
                    console.log(this.departureAirport, '|', this.arrivalAirport)
                    return false
                }
            },

            getAirports(){

                axios.get('http://127.0.0.1:8000/api/airports')
                
                .then(response=>{

                    console.log(response.data)

                    this.airports=response.data.airports;
                })
                .catch(error=>{
                    console.log(error)
                })
            },

            filter(){

                this.results=null

                axios.get('http://127.0.0.1:8000/api/flights', {
                    params:{
                        'departure-airport' : this.departureAirport,
                        'arrival-airport' : this.arrivalAirport,
                        'departure-date' : this.departureDate
                    }
                    }).then(response=>{
                        this.results=response.data.flights
                        console.log(this.results)
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                }
            },
            computed:{
                
            },
        created(){
            this.getAirports()
        }

    }

</script>

<template>

    <main>

        <div class="container" >

            <div class="row">

                <div class="col-10 offset-1 border border-primary">

                    <div class="row justify-content-center">

                        <div class="col">
                           SPECIAL OFFER JUMBOTRON OR CAROUSEL
                        </div>

                    </div>

                    
                </div>
                
            </div>
            
            <form @submit.prevent="filter()" method="get">

                <div>
                    <label for="departure-airport"> Departure Airport:</label>
                    <select name="departure-airport" id="departure-airport" v-model="departureAirport" required>

                        <option value="null" disabled selected >departure airport</option>
                        <option v-for="(airport, key) in airports" :key="key" :value="airport" :disabled="airport===arrivalAirport"> {{ airport }} </option>

                    </select>
                </div>
      
                <div>
                    <label for="arrival-airport"> Arrival Airport:</label>
                    <select name="arrival-airport" id="arrival-airport" v-model="arrivalAirport" required>

                        <option value="null" disabled selected>arrival airport</option>
                        <option v-for="(airport, key) in airports" :key="key" :value="airport" :disabled="airport===departureAirport" > {{ airport }} </option>

                    </select>
                </div>

                <div>

                    <label for="departure-date">Departure Date</label>

                    <input type="date" name="departure-date" id="departure-date" value="2013-05-21" :v-model="departureDate">

                </div>

                <div>
                    <input type="submit" value="search" :disabled="isParamsOk()">
                </div>
            </form>
            
            <div class="row">
    
                <div v-if="results==null || results.length<=0" class="col-12 text-center" >
                    no available flight
                </div>
    
                <div v-for="(flight, key) in results" class="col-12">
    
                    <div class="card">

                        <div class="col">
                            
                            {{ flight.number }}

                        </div>

                        <div class="col">
                            
                            {{ flight.departure_datetime }}

                        </div>  

                        <div class="col">
                            
                            {{ flight.arrival_datetime }}

                        </div>

                        <div class="col">
                            {{ flight.departure_airport.name}}
                        </div>

                        <div class="col">
                            {{ flight.arrival_airport.name }}
                        </div>

                    </div>
    
                </div>

            </div>

        </div>


    </main>

</template>

<style  lang="scss">

</style>