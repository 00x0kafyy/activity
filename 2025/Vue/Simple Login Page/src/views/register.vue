<template>
  <div class="container">
    <p v-if="message" :class="messageClass">{{ message }}</p>

    <h1>Register Page</h1>

    <label for="fullname">Input your real name :</label>
    <input v-model="fullname" id="fullname" placeholder="Your real name">
    
    <label for="username">Please enter your username :</label>
    <input v-model="username" id="username" placeholder="Your username">

    <label for="password">Please enter your password :</label>
    <input type="password" v-model="password" id="password" placeholder="Your password">

    <button @click="submit">
      Submit
    </button>
    <p>Have an account ? <a href="/login">login here</a></p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const fullname = ref('')
const username = ref('')
const password = ref('')
const message = ref('')
const isSuccess = ref(false)

const messageClass = computed(() => isSuccess.value ? 'success' : 'error')

function submit() {
  if (username.value === 'admin' && password.value === 'admin') {
    alert(`Welcome ${fullname.value}!`)
    isSuccess.value = true
    setTimeout(() => {
      window.location.href = 'https://00x0kafyy.github.io'
    }, 1000)
  } else {
    message.value = 'Register failed! Please check your data.'
    isSuccess.value = false
  }
}
</script>
