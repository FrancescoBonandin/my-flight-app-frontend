<script>

    import axios from 'axios';

    export default {

        data(){

            return{



                airports:null,
                departureAirport:null,
                arrivalAirport:null,

            }

        },
        methods:{

            getAirports(){

                axios.get('http://127.0.0.1:8000/api/airports')
                
                .then(response=>{

                    console.log(response.data)

                    this.airports=response.data.airports;
                })
                .catch(error=>{
                    console.log(error)
                })
            }
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
            
            <form action="" method="get">

                <div>
                    <label for="departure-airport"> Departure Airport:</label>
                    <select name="departure-airport" id="departure-airport" v-model="departureAirport" required>


                        <option value="null" disabled selected > departure airport</option>
                        <option v-for="(airport, key) in airports" :key="key" :value="airport" :disabled="airport===arrivalAirport"> {{ airport }}</option>

                    </select>
                </div>
      
                <div>
                    <label for="arrival-airport"> Arrival Airport:</label>
                    <select name="arrival-airport" id="arrival-airport" v-model="arrivalAirport" required>

                        <option value="null" disabled selected> arrival airport</option>
                        <option v-for="(airport, key) in airports" :key="key" :value="airport" :disabled="airport===departureAirport" > {{ airport }}</option>

                    </select>
                </div>

                <div>

                    <label for="departure-date">Departure Date</label>

                    <input type="date" name="departure-date" id="departure-date" value="2013-05-21">

                </div>

                <div>
                    <input type="submit" value="search">
                </div>
            </form>

        </div>

    </main>

</template>

<style  lang="scss">

</style>