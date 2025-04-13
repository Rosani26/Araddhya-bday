import {createRouter, createWebHistory} from 'vue-router'
import Home from './views/Home.vue'
import TicTakToe from "@/views/TicTakToe.vue";
import JourneyRiddle from "@/views/JourneyRiddle.vue";
import BdayMessage from "@/views/BdayMessage.vue";
import Memory from "@/views/Memory.vue";
import SnakeGame from "@/views/SnakeGame.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/journey/riddle', component: JourneyRiddle },
    { path: '/snake/game', component: SnakeGame }, // 👈 Add this line
    { path: '/tictaktoe', component: TicTakToe }, // 👈 Add this line
    { path: '/bday/message', component: BdayMessage }, // 👈 Add this line
    { path: '/bday/memory', component: Memory } // 👈 Add this line
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
