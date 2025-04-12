<template>
  <div class="journey-page">
    <h1>🎉 You made it!</h1>
    <p class="subtitle">This is just the beginning of our journey 💛</p>

    <div class="buttons">
      <button @click="showBirthday = true">🎂 Happy Birthday</button>
      <button @click="showTogether = true">🕒 How long are we together?</button>
    </div>

    <!-- Happy Birthday Modal with Tic-Tac-Toe -->
    <div v-if="showBirthday" class="modal-overlay">
      <div class="modal">
        <h2>🎉 Happy Birthday! 🎉</h2>
        <p>Let's play a fun game of Tic-Tac-Toe!</p>

        <!-- Tic-Tac-Toe Board -->
        <div class="tic-tac-toe-board">
          <div v-for="(cell, index) in board" :key="index" class="tic-tac-toe-cell" @click="makeMove(index)">
            {{ cell }}
          </div>
        </div>

        <div v-if="winner" class="winner-message">
          <p>🎉 Player {{ winner }} wins! 🎉</p>
          <button @click="resetGame">Play Again</button>
        </div>
        <div v-if="isDraw" class="draw-message">
          <p>It's a draw! 💫</p>
          <button @click="resetGame">Play Again</button>
        </div>

        <button @click="showBirthday = false">Close</button>
      </div>
    </div>

    <!-- Together Time Modal -->
    <div v-if="showTogether" class="modal-overlay" @click.self="showTogether = false">
      <div class="modal">
        <h2>🕒 Our Journey So Far</h2>
        <p>We've been together for <strong>{{ timeTogether }}</strong> 💫</p>
        <button @click="showTogether = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Modal toggles
const showTogether = ref(false)
const showBirthday = ref(false)

// 🎯 Replace this date with your actual relationship start date
const startDate = new Date('2024-09-13')

// Compute time together
const timeTogether = computed(() => {
  const now = new Date()
  const diff = now - startDate

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
  const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44))
  const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24))

  return `${years} year(s), ${months} month(s), and ${days} day(s)`
})

// Tic-Tac-Toe logic (Single Player)
const board = ref(Array(9).fill(''))
const currentPlayer = ref('X')  // Player is 'X', AI is 'O'
const winner = ref(null)
const isDraw = ref(false)

const router = useRouter() // Vue Router instance

function makeMove(index) {
  if (!board.value[index] && !winner.value && !isDraw.value) {
    board.value[index] = currentPlayer.value
    if (checkWinner()) {
      winner.value = currentPlayer.value
      // Redirect to the "Happy Birthday Message" page after winning
      router.push('/bday/memory')
    } else if (board.value.every(cell => cell !== '')) {
      isDraw.value = true
    } else {
      currentPlayer.value = 'O'  // AI's turn
      aiMove()
    }
  }
}

// AI Move
function aiMove() {
  // Basic AI strategy (random move)
  const availableMoves = board.value
      .map((cell, index) => cell === '' ? index : null)
      .filter(index => index !== null)

  const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)]
  board.value[randomMove] = 'O'

  if (checkWinner()) {
    winner.value = 'O'  // AI wins
    // Redirect to the "Happy Birthday Message" page after AI wins
    router.push('/bday/message')
  } else if (board.value.every(cell => cell !== '')) {
    isDraw.value = true  // Draw
  } else {
    currentPlayer.value = 'X'  // Back to player's turn
  }
}

// Check for a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ]

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern
    return board.value[a] && board.value[a] === board.value[b] && board.value[a] === board.value[c]
  })
}

function resetGame() {
  board.value = Array(9).fill('')
  winner.value = null
  isDraw.value = false
  currentPlayer.value = 'X'
}
</script>

<style scoped>
.journey-page {
  text-align: center;
  padding: 3rem 1rem;
  font-family: 'Courier New', monospace;
  background-color: #fffbea;
  color: #333;
}

.subtitle {
  margin-top: -1rem;
  margin-bottom: 2rem;
  font-size: 1.2rem;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

button {
  padding: 12px 20px;
  font-size: 1rem;
  background-color: #ffcb05;
  border: 2px solid #3b3b3b;
  cursor: pointer;
  border-radius: 8px;
  font-family: inherit;
  transition: transform 0.2s ease;
}

button:hover {
  transform: scale(1.05);
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.tic-tac-toe-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin-top: 20px;
}

.tic-tac-toe-cell {
  width: 60px;
  height: 60px;
  border: 2px solid #3b3b3b;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #f9f9f9;
  transition: background-color 0.2s ease;
}

.tic-tac-toe-cell:hover {
  background-color: #ffcb05;
}

.winner-message, .draw-message {
  margin-top: 20px;
}

.winner-message button, .draw-message button {
  margin-top: 10px;
  background-color: #ffcb05;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
</style>
