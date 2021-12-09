import { createRouter, createWebHistory } from "vue-router";
import App from './App.vue';

import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import Inmueble from './components/Inmueble.vue'
import InmuebleNuevo from './components/newInmueble.vue'
import ImueblesDisponibles from './components/InmueblesDisponibles'

const routes = [{
        path: '/',
        name: 'root',
        component: App
    },
    {
        path: '/user/logIn',
        name: "logIn",
        component: LogIn
    },
    {
        path: '/user/signUp',
        name: "signUp",
        component: SignUp
    },
    {
        path: '/user/home',
        name: "home",
        component: Home
    },
    {
        path: '/user/inmuebles',
        name: "inmuebles",
        component: Inmueble
    },
    {
        path: '/user/registrarInmueble',
        name: "newInmueble",
        component: InmuebleNuevo
    },
    {
        path: '/user/ArrendarInmueble',
        name: "arrendamientos",
        component: ImueblesDisponibles
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;