<template>
  <div class="snake-game">
    <h1>🐍 Snake Game</h1>
    <p>Collect 5 hearts to get a surprise! 🎉</p>
    <div class="game-board">
      <div
          v-for="(cell, index) in gameBoard"
          :key="index"
          :class="['game-cell',
                 cell === 'snake' ? 'snake' : '',
                 cell === 'heart' ? 'heart' : '']"
      ></div>
    </div>
    <div v-if="score >= 3" class="message">
      <p>🎉 You won! 🎉</p>
      <p> SUPRISE ATTACK! You collected 5 hearts! Redirecting to your surprise...</p>
    </div>
    <!-- Reset Button if Game is Over -->
    <div v-if="isGameOver" class="reset-button">
      <button @click="resetGame">Play Again</button>
    </div>

    <!-- Loading screen -->
    <div v-if="isLoading" class="loading">
      <p>Loading... Please wait</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

// Game settings
const boardSize = 10
const heartSymbol = 'heart'
const snakeSymbol = 'snake'

// Game state
const gameBoard = ref(Array(boardSize * boardSize).fill(null))
const snake = ref([{ x: 2, y: 2 }]) // Initial snake position
const direction = ref('RIGHT')
const score = ref(0)
const gameInterval = ref(null)
const heartPosition = ref(null) // Stores heart position
const isGameOver = ref(false)
const isLoading = ref(false) // Loading state
const router = useRouter()

// Directions: 'UP', 'DOWN', 'LEFT', 'RIGHT'
const moveDirection = {
  'UP': { x: 0, y: -1 },
  'DOWN': { x: 0, y: 1 },
  'LEFT': { x: -1, y: 0 },
  'RIGHT': { x: 1, y: 0 },
}

// Initialize game on mount
onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
  startGame()
})

// Cleanup before unmount
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyPress)
  clearInterval(gameInterval.value)
})

// Start the game and game loop
function startGame() {
  placeHeart()  // Place the first heart
  gameInterval.value = setInterval(moveSnake, 200)
}

// Move the snake based on the current direction
function moveSnake() {
  if (isGameOver.value) return
  const head = {...snake.value[0]}
  head.x += moveDirection[direction.value].x
  head.y += moveDirection[direction.value].y

  // Check if the snake hits the wall or itself
  if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= boardSize ||
      head.y >= boardSize ||
      snake.value.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    isGameOver.value = true
    clearInterval(gameInterval.value)
    return
  }

  // Add new head to snake
  snake.value.unshift(head)

  // Check if the snake eats a heart
  const headIndex = head.y * boardSize + head.x
  if (headIndex === heartPosition.value) {
    score.value += 1
    if (score.value >= 5) {
      setTimeout(() => {
        showLoadingScreen()  // Show loading screen before redirect
      }, 1000)
    }
    placeHeart()  // Place a new heart after collection
  } else {
    snake.value.pop()  // Remove the last part of the snake (no grow)
  }

  updateBoard()
}

// Place a heart randomly on the board
function placeHeart() {
  let randomIndex
  do {
    randomIndex = Math.floor(Math.random() * gameBoard.value.length)
  } while (gameBoard.value[randomIndex] === snakeSymbol || randomIndex === heartPosition.value)
  heartPosition.value = randomIndex // Save the new position of the heart
}

// Handle key press to change direction
function handleKeyPress(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.value !== 'DOWN') direction.value = 'UP'
      break
    case 'ArrowDown':
      if (direction.value !== 'UP') direction.value = 'DOWN'
      break
    case 'ArrowLeft':
      if (direction.value !== 'RIGHT') direction.value = 'LEFT'
      break
    case 'ArrowRight':
      if (direction.value !== 'LEFT') direction.value = 'RIGHT'
      break
  }
}

// Update the game board based on the snake's and heart's positions
function updateBoard() {
  // Reset the game board
  gameBoard.value.fill(null)

  // Add the snake to the board
  snake.value.forEach(segment => {
    const index = segment.y * boardSize + segment.x
    gameBoard.value[index] = snakeSymbol
  })

  // Add the heart to the board
  if (heartPosition.value !== null) {
    gameBoard.value[heartPosition.value] = heartSymbol
  }
}

// Reset the game to initial state
function resetGame() {
  snake.value = [{x: 2, y: 2}]  // Reset snake position
  direction.value = 'RIGHT'  // Reset direction
  score.value = 0  // Reset score
  isGameOver.value = false  // Reset game over status
  heartPosition.value = null  // Reset heart position
  placeHeart()  // Place new heart
  startGame()  // Restart game loop
}

// Show loading screen for 2 seconds before redirect
function showLoadingScreen() {
  isLoading.value = true
  setTimeout(() => {
    router.push('/bday/message')  // Redirect to the surprise page after 2 seconds
    isLoading.value = false
  }, 2000) // 2 seconds delay
}
</script>

<style scoped>
.snake-game {
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(10, 30px);
  gap: 1px;
  justify-content: center;
  margin: 20px 0;
}

.game-cell {
  width: 30px;
  height: 30px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
}

.snake {
  background-color: #4caf50;
}

.heart {
  background-color: red;
}

.message {
  color: #ff6347;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.reset-button {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
}

button:hover {
  background-color: #ff4500;
}

.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}
</style>
