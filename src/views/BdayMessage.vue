<template>
  <div class="letter-page">
    <h1>💌 Your Letter</h1>
    <p class="subtitle">Bithday Card 💛</p>
    <div class="letter-container">
      <div class="letter-content">
        <p>
          Dear Araddhya,<br><br>
          Cuz u didn't want me to write a letter im doing the thing i hate the most CODING. I love you so much that's
          why i even had fun doing this. Hope u have the best Birthday ever and the year of ur life (i generlly wish u
          the best life ever). Hope u stay healthy and happy and all your dreams should become true u lil street
          hussler. Make ur day shine like u make mine shine when i think about u. Ur the greates person alive and i
          couldn't imagine being without u.<br>Happy Birthday My Baby<br>
          With all my love,<br>
          Rosani
        </p>
      </div>
    </div>
    <div class="action-buttons">
      <button @click="sendLetter" class="send-button">Send</button>
    </div>

    <!-- Message Displayed after Send -->
    <div v-if="messageSent" class="message-sent">
      <p>I love you 💖</p>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

// State to track whether the message has been sent
const messageSent = ref(false)

function sendLetter() {
  // Set messageSent to true to display the "I love you" message
  messageSent.value = true
}
</script>

<style scoped>
.letter-page {
  background-color: #f1f4f9;
  color: #333;
  text-align: center;
  padding: 3rem 1rem;
  font-family: 'Roboto', sans-serif;
}

h1 {
  font-size: 2.5rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #777;
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
  color: #333;
  font-size: 1.1rem;
  line-height: 1.8;
  white-space: pre-wrap; /* Ensures line breaks are respected */
}

.action-buttons {
  margin-top: 1.5rem;
}

.send-button {
  background-color: #ff6b6b;
  color: white;
  font-size: 1.2rem;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.send-button:hover {
  background-color: #ff4757;
}

/* Message Displayed After Sending */
.message-sent {
  margin-top: 20px;
  font-size: 1.5rem;
  color: #ff00e7;
  font-weight: bold;
}
</style>
