import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        current:'',
        location: '',
        forecast:'',
        forecastday: '',
        options: {
            chart: {
                id: 'vuechart-example',
                "height": 350,
                "toolbar": {
                    "show": true,
                    "tools": {
                      "download": true,
                      "selection": true,
                      "zoom": true,
                      "zoomin": true,
                      "zoomout": true,
                      "pan": true,
                      "reset": true
                    },
                    "autoSelected": "zoom"
                  }
            },
            "dataLabels": {
                "enabled": true,
                "offsetX": -6,
                "style": {
                  "fontSize": "12px",
                  "colors": [
                    null
                  ]
                }
              },
            xaxis: {
                categories: []
            }
        },
        series: [{
            name: 'Degree Celsius',
            data: []
        }]
    },
    mutations:{
        SET_CURRENT(state, current){
            state.current = current
        },
        SET_LOCATION(state, location){
            state.location = location
        },
        SET_FORECAST(state, forecast){
            state.forecast = forecast
        },
        SET_FORECASTDAY(state, forecastday){
            state.forecastday = forecastday
            let forecast_array = []
            state.options.xaxis.categories = []
            state.series[0].data=[]
            forecast_array = forecastday;
            for(let i = 0; i < forecast_array.length; i++){
                let data_format = moment(forecast_array[i].date).format("ddd, MMM D YYYY")
                state.options.xaxis.categories.push(data_format)
                state.series[0].data.push(forecast_array[i].day.avgtemp_c)
                forecast_array[i].date = data_format;
            }
            window.dispatchEvent(new Event("resize"))
        }
    },
    actions:{

    },
    getters:{
        getForecastday(state){
            return state.forecastday
        },
        getApexOption(state){
            return state.options
        },
        getApexSeries(state){
            return state.series
        }
    }
})