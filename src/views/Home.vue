<template>
  <div>
    <h2>Enter Password to Continue</h2>
    <form @submit.prevent="handleLogin">
      <input
          v-model="password"
          type="password"
          placeholder="Enter password"
      />
      <button type="submit">Enter</button>
    </form>

    <p v-if="error" style="color:red;">Incorrect password. Try again dummy :P</p>

    <!-- Show hint after first incorrect attempt -->
    <p v-if="hint" style="color: #ff6347;">When did u swipe ur GF back on Hinge?</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const password = ref('')
const error = ref(false)
const hint = ref(false)  // To control the display of the hint
const router = useRouter()

const correctPassword = '26.07.2024'

const handleLogin = () => {
  if (password.value === correctPassword) {
    error.value = false
    hint.value = false  // Reset hint on successful login
    router.push('/journey/riddle')  // Redirect to the next page
  } else {
    error.value = true
    if (!hint.value) {
      hint.value = true  // Show the hint only after the first incorrect attempt
    }
  }
}
</script>

<style>
input {
  padding: 8px;
  margin-right: 10px;
}
button {
  padding: 8px 12px;
}
</style>
