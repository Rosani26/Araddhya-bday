<template>
  <div class="envelope-wrapper">
    <!-- Show closed or opened envelope -->
    <div v-if="!showLetter" class="envelope" @click="!isOpened && openEnvelope()">
      <img :src="envelopeSrc" :key="envelopeSrc" alt="Envelope" class="envelope-img" />
      <p v-if="!isOpened">Click to open 💌</p>
      <p v-else>Opening letter...❤</p> <!-- 💡 Add this line -->
    </div>


    <!-- Letter after opening -->
    <transition name="fade">
      <div v-if="showLetter" class="letter-page">
        <h1>💌 Your Letter</h1>
        <p class="subtitle">Birthday Card 💛</p>
        <div class="letter-container">
          <div class="letter-content">
            <p>
              Dear Araddhya,<br><br>
              Cuz u didn't want me to write a letter I'm doing the thing I hate the most — CODING.
              I love you so much that's why I even had fun doing this. Hope u have the best Birthday ever and the year of ur life...<br>
              Happy Birthday My Baby<br>
              With all my love,<br>
              Rosani
            </p>
          </div>
        </div>
        <div class="action-buttons">
          <button @click="sendLetter" class="send-button">Send</button>
        </div>
        <div v-if="messageSent" class="message-sent">
          <p>I love you 💖</p>
        </div>
      </div>
    </transition>
  </div>
</template>



<script setup>
import { ref } from 'vue'
import closedEnvelope from '@/assets/closed-envelope.png'
import openEnvelopeImg from '@/assets/open-envelope.png'

const isOpened = ref(false)
const showLetter = ref(false)
const envelopeSrc = ref(closedEnvelope)
const messageSent = ref(false)

function openEnvelope() {
  envelopeSrc.value = openEnvelopeImg
  isOpened.value = true

  setTimeout(() => {
    showLetter.value = true
  }, 1500)
}

function sendLetter() {
  messageSent.value = true
}
</script>


<style scoped>
.envelope-wrapper {
  text-align: center;
  padding: 2rem;
}

.envelope {
  cursor: pointer;
  animation: pulse 2s infinite;
}

.envelope-img {
  width: 200px;
  transition: transform 0.4s ease;
}

.envelope:hover .envelope-img {
  transform: scale(1.05);
}

/* Letter Styles (same as before, slightly trimmed) */
.letter-page {
  background-color: #f1f4f9;
  color: #333;
  padding: 3rem 1rem;
  font-family: 'Roboto', sans-serif;
}

.letter-container {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.letter-content {
  font-family: 'Georgia', serif;
  font-size: 1.1rem;
  line-height: 1.8;
  white-space: pre-wrap;
}

.send-button {
  background-color: #ff6b6b;
  color: white;
  font-size: 1.2rem;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1.5rem;
}

.message-sent {
  margin-top: 20px;
  font-size: 1.5rem;
  color: #ff00e7;
  font-weight: bold;
}

/* Transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Cute Pulse Animation */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
}
</style>
