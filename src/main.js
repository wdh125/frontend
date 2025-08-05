import { createApp } from 'vue'
import App from './App.vue'
// import './registerServiceWorker' // Đã xóa dòng này
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import titleMixin from './mixins/titleMixin'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)
app.mixin(titleMixin)
app.use(VueSweetalert2)
app.use(router)
app.use(store)
app.mount('#app')
