<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const toastStore = inject('toastStore')
const router = useRouter()
const isLogin = ref(true)

const loginForm = ref({
  email: '',
  password: '',
  loading: false,
  error: {
    email: {
      toggle: false,
      message: null
    },
    password: {
      toggle: false,
      message: null
    }
  }
})

async function login() {
  loginForm.value.loading = true
  await axios({
    method: 'post',
    url: `${import.meta.env.VITE_API_DOMAIN}/user/login`,
    data: {
      email: loginForm.value.email,
      password: loginForm.value.password
    }
  })
    .then((res) => {
      localStorage.setItem('qotes_userID', res.data.userID)
      localStorage.setItem('qotes_token', res.data.token)
      router.push({ name: 'home' })
      toastStore.addToast('successfully logged in', 3000)
    })
    .catch((err) => {
      if (
        err.response.status === 400 ||
        (err.response.status === 401 && err.response.data === 'Account not yet approved')
      ) {
        loginForm.value.error.email.toggle = true
        loginForm.value.error.password.toggle = true
        loginForm.value.error.email.message = err.response.data
        loginForm.value.error.password.message = null
      } else if (err.response.status === 401 && err.response.data === 'Wrong password') {
        loginForm.value.error.email.toggle = false
        loginForm.value.error.password.toggle = true
        loginForm.value.error.email.message = null
        loginForm.value.error.password.message = err.response.data
      } else {
        toastStore.addToast(err.response.data, 3000)
      }
    })
    .finally(() => (loginForm.value.loading = false))
}

const signupForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  loading: false,
  error: {
    email: {
      toggle: false,
      message: null
    },
    passwords: {
      toggle: false,
      message: null
    }
  }
})

async function signUp() {
  signupForm.value.loading = true
  if (signupForm.value.password === signupForm.value.confirmPassword) {
    await axios({
      method: 'post',
      url: `${import.meta.env.VITE_API_DOMAIN}/user/signup`,
      data: {
        email: signupForm.value.email,
        password: signupForm.value.password,
        firstName: signupForm.value.firstName,
        lastName: signupForm.value.lastName
      }
    })
      .then(() => {
        isLogin.value = true
        toastStore.addToast('Account Created', 3000)
        setTimeout(() => toastStore.addToast('Please wait for your account approval', 3000), 1000)
      })
      .catch((err) => {
        if (err.response.status === 409) {
          signupForm.value.error.email.toggle = true
          signupForm.value.error.passwords.toggle = false
          signupForm.value.error.email.message = err.response.data
          signupForm.value.error.passwords.message = null
        } else {
          toastStore.addToast(err.response.data, 3000)
        }
      })
      .finally(() => (signupForm.value.loading = false))
  } else {
    signupForm.value.error.email.toggle = false
    signupForm.value.error.passwords.toggle = true
    signupForm.value.error.email.message = null
    signupForm.value.error.passwords.message = "Passwords doesn't match"
  }
}
</script>

<template>
  <div class="flex h-svh w-full items-center justify-center p-4">
    <transition name="fade-scale" mode="out-in">
      <form
        v-if="isLogin"
        @submit.prevent="login()"
        class="flex w-full max-w-[640px] flex-col gap-2"
      >
        <h2>Login to your account</h2>
        <AppFormTextbox
          v-model="loginForm.email"
          :state="loginForm.error.email.toggle ? 'error' : 'default'"
          label="Email"
          :sub-label="loginForm.error.email.message"
          type="email"
          class="w-full"
          autocomplete="username"
          required
        />
        <AppFormTextbox
          v-model="loginForm.password"
          :state="loginForm.error.password.toggle ? 'error' : 'default'"
          label="Password"
          :sub-label="loginForm.error.password.message"
          type="password"
          class="w-full"
          autocomplete="current-password"
          required
        />
        <AppButtonSolid :is-loading="loginForm.loading" type="submit" wide>Login</AppButtonSolid>

        <p class="place-self-end">
          Don't have an account?
          <AppButtonText @click="isLogin = !isLogin" type="button">Sign up</AppButtonText>
        </p>
      </form>

      <form v-else @submit.prevent="signUp()" class="flex w-full max-w-[640px] flex-col gap-2">
        <h2>Create your account</h2>
        <AppFormTextbox
          v-model="signupForm.firstName"
          label="First Name"
          type="text"
          class="w-full"
          required
        />
        <AppFormTextbox
          v-model="signupForm.lastName"
          label="Last Name"
          type="text"
          class="w-full"
          required
        />
        <AppFormTextbox
          v-model="signupForm.email"
          :state="signupForm.error.email.toggle ? 'error' : 'default'"
          label="Email"
          :sub-label="signupForm.error.email.message"
          type="email"
          class="w-full"
          autocomplete="username"
          required
        />
        <AppFormTextbox
          v-model="signupForm.password"
          :state="signupForm.error.passwords.toggle ? 'error' : 'default'"
          label="Password"
          :sub-label="signupForm.error.passwords.message"
          type="password"
          class="w-full"
          autocomplete="new-password"
          required
        />
        <AppFormTextbox
          v-model="signupForm.confirmPassword"
          :state="signupForm.error.passwords.toggle ? 'error' : 'default'"
          label="Confirm Password"
          :sub-label="signupForm.error.passwords.message"
          type="password"
          class="w-full"
          autocomplete="new-password"
          required
        />
        <AppButtonSolid :is-loading="signupForm.loading" type="submit" wide>
          Create Account
        </AppButtonSolid>

        <p class="place-self-end">
          Already have an account?
          <AppButtonText @click="isLogin = !isLogin" type="button">Login here</AppButtonText>
        </p>
      </form>
    </transition>
  </div>
</template>
