import './assets/main.css'
import router from './router' //no need to specify its name "index.js" because is automatic

import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, fas } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, fas);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app') //use router before mount
