<template>
  <div class="center">
    <h1>🎂Happy Birthday Poopy Pants🎉</h1>
    <router-view/>
  </div>
</template>
<style>

body {
  margin: 0;
  font-family: 'JetBrains Mono', monospace;
  background-color: #fddbf6;
  color: #333;
}

.center {
  height: 100vh;
  display: flex;
  flex-direction: column; /* vertical stacking */
  justify-content: center; /* vertical center */
  align-items: center;     /* horizontal center */
  text-align: center;
}

#app {
  padding: 20px;
}

nav {
  margin-bottom: 1rem;
}

a {
  text-decoration: none;
  margin: 0 10px;
  color: #007BFF;
}

a.router-link-exact-active {
  font-weight: bold;
}
button {
  font-family: 'Press Start 2P', cursive;
  background-color: #ffcb05;
  border: 4px solid #3b3b3b;
  color: #3b3b3b;
  padding: 10px 20px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 4px #3b3b3b;
  transition: all 0.1s ease-in-out;
}

button:hover {
  background-color: #e3bd27;
}

button:active {
  transform: translateY(4px);
  box-shadow: 0 0 #3b3b3b;
}
input {
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  padding: 10px;
  background-color: #fff;
  border: 3px solid #3b3b3b;
  color: #3b3b3b;
  text-transform: uppercase;
  letter-spacing: 1px;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
}

input:focus {
  border-color: #ffcb05;
  box-shadow: 0 0 5px rgba(255, 203, 5, 0.5);
}

input::placeholder {
  color: #888;
}

input:active {
  transform: translateY(2px);
  box-shadow: 0 0 3px rgba(255, 203, 5, 0.5);
}


</style>
