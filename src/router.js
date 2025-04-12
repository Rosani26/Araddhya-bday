import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import About from './views/SeeJourney.vue'
import Journey from './views/JourneyRiddle.vue'
import JourneyCompleted from "@/views/journeyCompleted.vue";
import JourneyRiddle from "@/views/JourneyRiddle.vue";
import BdayMessage from "@/views/BdayMessage.vue";
import SeeJourney from "@/views/SeeJourney.vue";
import Memory from "@/views/Memory.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/see/journey', component: SeeJourney },
    { path: '/journey/riddle', component: JourneyRiddle }, // 👈 Add this line
    { path: '/journey/completed', component: JourneyCompleted }, // 👈 Add this line
    { path: '/bday/message', component: BdayMessage }, // 👈 Add this line
    { path: '/bday/memory', component: Memory } // 👈 Add this line
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
