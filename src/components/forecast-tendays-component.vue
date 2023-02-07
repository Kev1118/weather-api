<template>
    <div v-if="getForecastday">
        <div class="d-flex justify-content-center mb-3">
            <apexchart-component 
                ref="getForecastday"
                width="800" type="line" 
                :options="getApexOption" 
                :series="getApexSeries"></apexchart-component>
        </div>

        <ul class="list-group" v-for="(item, index) in getForecastday" :key="index">
            <li class="list-group-item">
                <div class="accordion" role="tablist">
                    <div class="d-flex justify-content-between" v-b-toggle="'accordion-'+item.date_epoch">
                        <span>{{ item.date }}</span>
                        <img :src="item.day.condition.icon" alt="">
                        <span>{{ item.day.mintemp_c }}° C / {{ item.day.maxtemp_c }} ° C</span>
                        <span>{{ item.day.condition.text }} </span>
                        <span><font-awesome-icon icon="wind"></font-awesome-icon> {{ item.day.maxwind_kph }} km/h</span>
                    </div>
                    <div>
                        <b-collapse :id="'accordion-'+item.date_epoch" accordion="my-accordion" role="tabpanel">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-4 d-flex flex-column">
                                        <span>Average: {{ item.day.avgtemp_c }}° C</span>
                                        <span>Average: {{ item.day.avgtemp_f }}° F</span>
                                    </div>
                                    <div class="col-lg-4 d-flex flex-column">
                                        <span><font-awesome-icon icon="arrows-alt"></font-awesome-icon> Pressure: {{ item.hour[0].pressure_mb }} mb </span>
                                        <span><font-awesome-icon icon="eye"></font-awesome-icon> Visibility: {{ item.day.avgvis_km }} km </span>
                                    </div>
                                    <div class="col-lg-4 d-flex flex-column">
                                        <span><font-awesome-icon icon="tint"></font-awesome-icon> Humidity: {{ item.day.avghumidity }}</span>
                                        <span><font-awesome-icon icon="sun"></font-awesome-icon> UV: {{ item.day.uv }}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="card">
                                        <div class="card-body d-flex flex-row">
                                            <div class="d-flex flex-column px-2">
                                                <span>Sunrise: {{ item.astro.sunrise }}</span>
                                                <span>Sunset: {{ item.astro.sunset }}</span>
                                            </div>
                                            <div class="d-flex flex-column px-2">
                                                <span>Moonrise: {{ item.astro.moonrise }}</span>
                                                <span>Moonset: {{ item.astro.moonset }}</span>
                                            </div>
                                            <div class="px-2">
                                                <span>Moon Phase: {{ item.astro.moon_phase }}</span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-collapse>
                    </div>
                </div>
              
            </li>
        </ul>

        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import moment from 'moment'

export default{
    name: 'forecast-tenday-component',
    data(){
        return {
           
        }
    },
   
    computed:{
        ...mapGetters(['getForecastday','getApexOption','getApexSeries'])
    },
    methods:{
       
        
    },

  
}
</script>