<template>
  <div>
    <h2>About Us</h2>
    <p>Do you want to see our journey?</p>
    <button @click="askRiddle">Yes, show me!</button>

    <!-- Riddle -->
    <div v-if="showRiddle" class="riddle">
      <p><strong>Riddle:</strong> What was written on the cake Rosani gave u?</p>
      <p style="color: #ff0066"><strong>Hint:</strong> no capital letters, write everything small XD</p>
      <input v-model="answer" type="text" placeholder="Type your answer..." />
      <button @click="checkAnswer">Submit</button>
      <p v-if="riddleFeedback" :style="{color: feedbackColor}">{{ riddleFeedback }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showRiddle = ref(false)
const answer = ref('')
const riddleFeedback = ref('')
const feedbackColor = ref('')

const correctAnswer = 'will u be my bf?'

const askRiddle = () => {
  showRiddle.value = true
}

const checkAnswer = () => {
  if (answer.value.toLowerCase() === correctAnswer) {
    riddleFeedback.value = 'Correct! Redirecting to the Journey...'
    feedbackColor.value = 'green'
    setTimeout(() => {
      router.push('/tictaktoe')
    }, 1500)
  } else {
    riddleFeedback.value = 'Wrong answer. Try again.'
    feedbackColor.value = 'red'
  }
}
</script>

<style>
button {
  padding: 10px 16px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  background-color: #ffcb05;
  border: 4px solid #3b3b3b;
  color: #3b3b3b;
}

input {
  padding: 10px;
  margin-top: 10px;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
}

.riddle {
  margin-top: 20px;
  text-align: center;
}

p {
  font-family: 'Press Start 2P', cursive;
}
</style>
