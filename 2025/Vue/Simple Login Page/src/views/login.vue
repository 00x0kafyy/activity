<template>
  <div class="container">
    <p v-if="message" :class="messageClass">{{ message }}</p>

    <h1>Login Page</h1>

    <label for="name">Please enter your username :</label>
    <input v-model="name" id="name" placeholder="Your name">

    <label for="password">Please enter your password :</label>
    <input type="password" v-model="password" id="password" placeholder="Your password">

    <button @click="submit">
      Submit
    </button>
    <p>Do you not have an account ? <a href="/register">login here</a></p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const name = ref('')
const password = ref('')
const message = ref('')
const isSuccess = ref(false)

// computed property untuk class
const messageClass = computed(() => isSuccess.value ? 'success' : 'error')

function submit() {
  if (name.value === 'admin' && password.value === 'admin') {
    alert('Login successful!')
    isSuccess.value = true
    setTimeout(() => {
      window.location.href = 'http://localhost:5173/dashboard'
    }, 1000)
  } else {
    message.value = 'Login failed! Please check your username and password.'
    isSuccess.value = false
  }
}
</script>
