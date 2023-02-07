import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


const IconList = Object
    .keys(Icons)
    .filter(key => key !== 'fas' && key !== 'prefix')
    .map(icon => Icons[icon])

library.add(...IconList)
Vue.component('font-awesome-icon', FontAwesomeIcon)
