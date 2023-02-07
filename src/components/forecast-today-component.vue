<template>
    <div v-if="hoursArray_5">
        <div class="d-flex justify-content-between">
            <div v-for="(item, index) in hoursArray_5" :key="index">
                <div class="card">
                    <div class="card-body d-flex flex-column align-items-center">
                        <span class="text-white">{{ item.time }}</span>
                        <span>{{ item.temp_c }}° C</span>
                        <img :src="item.condition.icon" height="80" width="80" alt="">
                        <span class="text-white">{{ item.condition.text }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import EventBus from '../event-bus.js'
export default {
    name: 'forecast-today-component',
    props:{
        todayforecast:{
            type: Array,
        },
        current_date:{
            type: String,
            default: ''
        }
    },
    data(){
        return{
            hoursArray_5: [],
            array_today1: this.todayforecast
        }
    },
    mounted(){
        EventBus.$on("searchWeatherToday", () => {
      this.searchWeatherToday();
    });
    },
    methods:{
        searchWeatherToday(){
            
            // console.log(this.array_today1)
            let momentFormat = "YYYY-MM-DD HH"
            this.hoursArray_5 = []
            let currentHour = moment().format('YYYY-MM-DD HH');
            let currentHour_plus1 = moment(currentHour).add(1, 'hour').format(momentFormat) + ':00';
            let currentHour_plus2 = moment(currentHour).add(2, 'hour').format(momentFormat) + ':00';
            let currentHour_plus3 = moment(currentHour).add(3, 'hour').format(momentFormat) + ':00';
            let currentHour_plus4 = moment(currentHour).add(4, 'hour').format(momentFormat) + ':00';
            let currentHour_plus5 = moment(currentHour).add(5, 'hour').format(momentFormat) + ':00';
            let array_length = this.todayforecast.length;
            let array_today = this.todayforecast
            
            console.log('currentHour: ' + currentHour)
            console.log('currentHour_plus1: ' + currentHour_plus1)

            for(let i = 0; i < array_length; i++){
                // console.log(array_today[i].time)
                if(currentHour_plus1 == array_today[i].time){
                    array_today[i].time = moment(array_today[i].time).format('HH') + ':00';
                    this.hoursArray_5.push(array_today[i])
                }
                if(currentHour_plus2 == array_today[i].time){
                    array_today[i].time = moment(array_today[i].time).format('HH') + ':00';
                    this.hoursArray_5.push(array_today[i])
                }
                if(currentHour_plus3 == array_today[i].time){
                    array_today[i].time = moment(array_today[i].time).format('HH') + ':00';
                    this.hoursArray_5.push(array_today[i])
                }
                if(currentHour_plus4 == array_today[i].time){
                    array_today[i].time = moment(array_today[i].time).format('HH') + ':00';
                    this.hoursArray_5.push(array_today[i])
                }
                if(currentHour_plus5 == array_today[i].time){
                    array_today[i].time = moment(array_today[i].time).format('HH') + ':00';
                    this.hoursArray_5.push(array_today[i])
                }
            }
            console.log(this.hoursArray_5)
            // this.todayforecast.map((hr) => {
            //     if(currentHour_plus1 == hr.time){
            //         hr.time = moment(hr.time).format('HH:00')
            //         this.hoursArray_5.push(hr)
            //     }
            //     if(currentHour_plus2 == hr.time){
            //         hr.time = moment(hr.time).format('HH:00')
            //         this.hoursArray_5.push(hr)
            //     }
            //     if(currentHour_plus3 == hr.time){
            //         hr.time = moment(hr.time).format('HH:00')
            //         this.hoursArray_5.push(hr)
            //     }
            //     if(currentHour_plus4 == hr.time){
            //         hr.time = moment(hr.time).format('HH:00')
            //         this.hoursArray_5.push(hr)
            //     }
            //     if(currentHour_plus5 == hr.time){
            //         hr.time = moment(hr.time).format('HH:00')
            //         this.hoursArray_5.push(hr)
            //     }
            // })
            
            
           
        }
    }
}
</script>

<style scoped>
.card{
    background-color: transparent;
    border: 1px solid #dedede;
}
</style>