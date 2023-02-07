<template>
  <div id="app">
    <weatherComponent></weatherComponent>
  </div>
</template>

<script>
import weatherComponent from './components/weather-component.vue';
export default {
  name: 'App',
  components: { 
    weatherComponent
  },

  
}
</script>

<style>
#app{
  background: url('./assets/weather-good.png');
  background-repeat: no-repeat;
  background-size: cover;

}
</style>

