<template>
    <div>
        <div class="container ">
            <div class="row">
                <div class="searchContainer">
                    <input type="text" placeholder="Search Location"
                    v-model="location"
                    @keypress.enter="searchWeather(location)"
                    >
                </div>
                <div class="col-lg-12">
                    <div class="weather-container">
                        <span class="d-flex align-center">
                            <h5 class="text-white" v-if="weather_location">{{ weather_location }} as of {{ time }}</h5>
                        </span>
                        <div class="row">
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="weather-detials d-flex">
                                    <h5 v-if="condition_icon"><img :src="condition_icon" alt=""></h5>
                                    <div class="d-flex flex-column align-center justify-content-center">
                                        <h5 class="text-white" v-if="temp_celcius">{{ temp_celcius }} C</h5>
                                        <h5 class="text-white" v-if="temp_farenheit">{{ temp_farenheit }} F</h5>
                                    </div>
                                </div>
                               
                                <h5 v-if="condition">{{ condition }}</h5>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12 ">
                                <div class="d-flex flex-column justify-content-center">
                                    <span class="text-white">feels like: {{ feelslike_c }} C</span>
                                    <span class="text-white">feels like: {{ feelslike_f }} F</span>
                                    <span class="text-white"><font-awesome-icon icon="wind"></font-awesome-icon> Wind: {{ wind }} km/h</span>
                                    <span class="text-white"><font-awesome-icon icon="arrows-alt"></font-awesome-icon> Pressure: {{ pressure }} mb</span>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-12 col-sm-12">
                                <div class="d-flex flex-column justify-content-center">
                                    <span class="text-white"><font-awesome-icon icon="tint"></font-awesome-icon> Humidity: {{ humidity }}%</span>
                                    <span class="text-white"><font-awesome-icon icon="eye"></font-awesome-icon> Visibility: {{ vis_km }}km</span>
                                    <span class="text-white"><font-awesome-icon icon="sun"></font-awesome-icon> UV: {{ UV }} of 10</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="forcast-today">
              
                    <forecastTodayComponent :todayforecast="hoursArray" :current_date="current_date" ></forecastTodayComponent>
                   
                </div>
            </div>
            <div class="row">
                <div class="forcast-container">
                    <h5>FORECAST</h5>
                    <forecastTendaysComponent></forecastTendaysComponent>
                </div>
            </div>
            <div v-if="isloading" class="loading-container">
                <loadingComponent ></loadingComponent>
            </div>
           
             
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment';
import data from '../data.json'
import loadingComponent from './loading-component.vue';
import forecastTodayComponent from './forecast-today-component.vue';
import forecastTendaysComponent from './forecast-tendays-component.vue';
import EventBus from '../event-bus.js'
export default {
    name: 'weather-component',
    components:{
        loadingComponent,
        forecastTodayComponent,
        forecastTendaysComponent
    },
    created(){
        // UNCOMMENT BEFORE SETTING UP TO PRODUCTION
        // axios.get("https://api.ipregistry.co/124.106.139.195?key=vbyy9h794pad1mso")
            // .then((res) => {
            //     console.log(res.data.location.city)
            //     this.searchWeather(res.data.location.city)
            // })
            // .catch(() =>{
            //     console.log('Error trying to get your current location')
                
            // })
            this.searchWeather('Philippines')
    },
    data(){
        return{
            isloading: false,
            current_date: '',
            hoursArray: [],
            forecastday: [],
            
            data: data,
            url: "",
            location: '',
            // WEATHER DETAILS
            temp_celcius: "",
            temp_farenheit: "",
            feelslike_c: '',
            feelslike_f: '',
            timezone: '',
            condition: '',
            condition_icon: '',
            weather_location: '',
            time: '',
            wind: '',
            pressure:'',
            humidity: '',
            UV: '',
            vis_km: '',
        }
    },
    methods:{
        searchWeather(currentLocation){
            this.isloading = true
            axios.get("https://api.weatherapi.com/v1/forecast.json?key=40bcb26d498a48edbbb90555232801&q="+currentLocation+"&days=5&aqi=no&alerts=no")
                .then((res) => {
                    
                    this.temp_celcius= res.data.current.temp_c+"°";
                    this.temp_farenheit= res.data.current.temp_f+"°";
                    this.condition = res.data.current.condition.text;
                    this.condition_icon = res.data.current.condition.icon;
                    this.weather_location = res.data.location.name + ", " + res.data.location.country;
                    this.time = moment(String(res.data.location.localtime)).format("dddd, MMMM Do YYYY, h:mm a");
                    this.timezone = res.data.location.tz_id
                    this.feelslike_c = res.data.current.feelslike_c+"°";
                    this.feelslike_f = res.data.current.feelslike_f+"°";
                    this.wind = res.data.current.wind_kph;
                    this.pressure = res.data.current.pressure_mb;
                    this.humidity = res.data.current.humidity;
                    this.UV = res.data.current.uv;
                    this.vis_km = res.data.current.vis_km;

                    this.forecastday = res.data.forecast.forecastday
                    this.current_date = moment().format('YYYY-MM-DD')
                    this.$store.commit('SET_FORECASTDAY', this.forecastday);

                    // console.log(this.forecastday)
                    for(let i = 0; i < this.forecastday.length; i++){
                        if(moment(this.current_date).format("ddd, MMM D YYYY") == this.forecastday[i].date){
                            this.hoursArray = this.forecastday[i].hour;
                        }
                    }
                    // this.forecastday.map((getDate) =>{
                    //     if(this.current_date == getDate.date){
                    //         this.hoursArray = getDate.hour;
                    //     }
                    // })
                    
                   
                    // console.log(this.hoursArray)
                    setTimeout(() => {
                        EventBus.$emit("searchWeatherToday");
                    }, 1000);
                    this.isloading = false
                })
                .catch((err) => {
                    console.log(err)
                    this.$swal.fire({
                        title:'Error',
                        text: err,
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                })
                this.isloading = false
        
           
        }
    }
}
</script>

<style>

.searchContainer{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
     
}
.searchContainer input{
  padding: .7rem 1.5rem;
  background-color: rgba(00, 0, 0, 0.2);
  border-radius: 25px;
  border: 1px solid rgba(0,0,0,0.2);
    color: #ffffff;
}
.searchContainer input::placeholder{
  color: #ffffff;
}
.weather-container,
.forcast-today,
.forcast-container{
    border: 1px 2px 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(0, 0, 0, 0.2);
    padding: 1rem;
    border-radius: 25px;
    margin-bottom: 10px;
}
.weather-detials h5:nth-child(1) img, 
.forcast-today .card img{
    height: 8rem;
    width: 8rem;
}
.forcast-today .card span:nth-child(2){
    color: rgb(15, 11, 240);
    font-size: 1.3em;
}

.loading-container{
    
}
</style>
