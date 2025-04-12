<template>
  <div class="memory-game">
    <h2>Memory Game - Match the pairs!</h2>

    <div class="cards-container">
      <div
          v-for="(card, index) in shuffledCards"
          :key="index"
          class="card"
          :class="{ flipped: card.flipped || card.matched }"
          @click="flipCard(card)"
      >
        <div class="card-inner">
          <div class="card-front"></div>
          <div class="heart-icon">❤️</div>
          <div class="card-back">
            <img :src="card.img" alt="card image" />

          </div>
        </div>
      </div>
    </div>

    <div v-if="gameCompleted" class="game-completed">
      <p>🎉 Congratulations! You've completed the game.</p>
      <button @click="goToNextPage">Go to the Journey</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ✅ Load images dynamically from /assets/cards
const rawImages = import.meta.glob('@/assets/cards/*.jpg', {
  eager: true,
  import: 'default'
})

const imagePaths = Object.values(rawImages)

// ✅ Create 2 of each image for matching pairs
const cards = imagePaths.flatMap((img) => [
  { img, flipped: false, matched: false },
  { img, flipped: false, matched: false }
])

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5)
}

const shuffledCards = ref(shuffle(cards))
const flippedCards = ref([])
const gameCompleted = ref(false)

function flipCard(card) {
  if (flippedCards.value.length < 2 && !card.flipped && !card.matched) {
    card.flipped = true
    flippedCards.value.push(card)

    if (flippedCards.value.length === 2) {
      checkMatch()
    }
  }
}

function checkMatch() {
  setTimeout(() => {
    const [first, second] = flippedCards.value

    if (first.img === second.img) {
      first.matched = true
      second.matched = true
    } else {
      first.flipped = false
      second.flipped = false
    }

    flippedCards.value = []

    if (shuffledCards.value.every((card) => card.matched)) {
      gameCompleted.value = true
    }
  }, 800)
}

function goToNextPage() {
  router.push('/journey/riddle')
}
</script>

<style scoped>
.memory-game {
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
  margin: 2rem auto;
  max-width: 600px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  justify-items: center;
  margin-top: 20px;
}

.card {
  width: 80px;
  height: 80px;
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  border-radius: 6px;
}

.card-front {
  background-color: #e3bd27;
  color: white;
}

.card-back {
  background-color: #ffcb05;
  transform: rotateY(180deg);
  overflow: hidden;
  position: relative;
}

.card-back img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.heart-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 2rem;
  color: red;
}

.game-completed {
  margin-top: 30px;
  font-size: 18px;
  color: #444;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ffcb05;
  border: 2px solid #3b3b3b;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  font-family: 'Courier New', Courier, monospace;
}
</style>
