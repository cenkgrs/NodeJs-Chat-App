import { createApp } from 'vue'
import App from './App.vue'

import './assets/css/sidebar.css';
import 'primeicons/primeicons.css';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import '/node_modules/primeflex/primeflex.css'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#app')
