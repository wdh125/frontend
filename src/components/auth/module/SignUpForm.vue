<template>
  <div class="group-form">
    <form @submit.prevent="">
      <Inputed id="username" type="text" placeholder="Enter your username" label="Username :" @keyup="checkUsername" />
      <div v-if="isUsername" class=" mb-3 text-danger validation">Username must be at least 4 characters</div>
      <Inputed id="fullName" type="text" placeholder="Enter your full name" label="Full Name :" @keyup="checkFullName" />
      <div v-if="isFullName" class=" mb-3 text-danger validation">Full name is required</div>
      <Inputed id="email" type="email" placeholder="Enter your email address" label="Email Address :" @keyup="checkEmail" />
      <div v-if="isEmail" class=" mb-3 text-danger validation">Your email format is incorrect</div>
			<Inputed id="password" type="password" placeholder="Enter your password" label="Password :"  @keyup="checkPassword" />
      <div v-if="isPass" class=" mb-3 text-danger validation">Your password must be 8 character</div>
			<Inputed id="phone" type="text" placeholder="Enter your phone number" label="Phone Number :" @keyup="checkNum" />
      <!-- <div v-if="isPhone" class=" mb-3 text-danger validation">Your phone number is incorrect</div> -->
			<div class="mb-3"></div>
      <Button color="btn-yellow btn-auth" label="Sign Up" :nonActiveImg="isSubmitting ? 0 : 1" @click="register" :disabled="isSubmitting"></Button>
    </form>
    <Button color="btn-white-auth" label="Sign Up With Google" :nonActiveImg="0"  ></Button>
    <TextMuted text="Already have an account?"></TextMuted>
    <!-- <router-link to="/auth/login"> -->
    <Button color="btn-brown btn-auth" label="Login Now" :nonActiveImg="1" @click="goLogin" ></Button>
    <!-- </router-link> -->
  </div>
</template>

<script>
import Button from '../base/Button.vue'
import Inputed from '../base/Input.vue'
import TextMuted from '../base/TextMuted.vue'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
	name: 'SignUpForm',
	components: {
		Button,
		Inputed,
		TextMuted
	},
	data () {
		return {
			username: '',
			fullName: '',
			pass: '',
			email: '',
			number: '',
			isUsername: 0,
			isFullName: 0,
			isEmail: 0,
			isPass: 0,
			isPhone: 0,
			isSubmitting: false
		}
	},
	methods: {
		goLogin () {
			this.$router.push('/auth/login')
		},
		checkUsername (e) {
			const inputUsername = e.target.value
			if (inputUsername.length >= 1) {
				this.username = inputUsername
				if (inputUsername.length < 4) {
					this.isUsername = 1
				} else {
					this.isUsername = 0
				}
			} else if (inputUsername.length < 1) {
				this.username = ''
				this.isUsername = 0
			}
		},
		checkFullName (e) {
			const inputFullName = e.target.value
			if (inputFullName.length >= 1) {
				this.fullName = inputFullName
				this.isFullName = 0
			} else if (inputFullName.length < 1) {
				this.fullName = ''
				this.isFullName = 1
			}
		},
		checkPassword (e) {
			const inputPass = e.target.value
			if (inputPass.length >= 1) {
				this.pass = inputPass
				if (inputPass.length < 8) {
					this.isPass = 1
				} else {
					this.isPass = 0
				}
			} else if (inputPass.length <= 0) {
				this.pass = ''
				this.isPass = 0
			}
		},
		checkEmail (e) {
			const inputEmail = e.target.value
			if (inputEmail.length >= 1) {
				this.email = inputEmail
				if (!inputEmail.includes('@')) {
					this.isEmail = 1
				} else {
					this.isEmail = 0
				}
			} else if (inputEmail.length < 1) {
				this.email = ''
				this.isEmail = 0
			}
		},
		checkNum (e) {
			const inputNum = e.target.value
			if (inputNum.length > 0) {
				this.number = inputNum
			} else if (!inputNum.length <= 0) {
				this.number = ''
			}
			// if (inputNum.length > 0) {
			// 	this.number = inputNum
			// 	if (inputNum.length < 8) {
			// 		this.isPhone = 1
			// 	} else {
			// 		this.isPhone = 0
			// 	}
			// } else if (!inputNum.length <= 0) {
			// 	this.number = ''
			// 	this.isPhone = 0
			// }
		},
		async register () {
			// Prevent double click
			if (this.isSubmitting) {
				return
			}

			this.isSubmitting = true

			const username = this.username
			const fullName = this.fullName
			const email = this.email
			const password = this.pass
			const phoneNumber = this.number

			// Validation
			if (!username || username.length < 4) {
				this.isSubmitting = false
				return Swal.fire({
					icon: 'error',
					title: 'Username must be at least 4 characters!'
				})
			} else if (!fullName || fullName.length < 1) {
				this.isSubmitting = false
				return Swal.fire({
					icon: 'error',
					title: 'Full name is required!'
				})
			} else if (!email || email.length < 1) {
				this.isSubmitting = false
				return Swal.fire({
					icon: 'error',
					title: 'Fill the blank email!'
				})
			} else if (!password || password.length < 8) {
				this.isSubmitting = false
				return Swal.fire({
					icon: 'error',
					title: 'Your password is too short!',
					text: 'Use minimal 8 character'
				})
			}

			const user = {
				username,
				fullName,
				email,
				password,
				phone: phoneNumber
			}

						try {
				const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/'
				const response = await axios.post(`${baseUrl}auth/register`, user)

				await Swal.fire({
					icon: 'success',
					title: response.data.message || 'Registration successful!',
					timer: 1000,
					showConfirmButton: false,
					allowOutsideClick: false,
					allowEscapeKey: false
				})

				this.$router.push('/auth/login')
			} catch (err) {
				console.error('Registration error:', err)
				console.error('Response data:', err.response?.data)
				console.error('Response status:', err.response?.status)

				let errorMessage = 'Registration failed'
				if (err.response?.data?.message) {
					errorMessage = err.response.data.message
				} else if (err.response?.data?.error) {
					errorMessage = err.response.data.error
				} else if (err.message) {
					errorMessage = err.message
				}

				Swal.fire({
					icon: 'error',
					title: errorMessage
				})
			} finally {
				this.isSubmitting = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>

.validation {
	font-family: Rubik;
}

.group-form {
  width: 505px;
}
</style>
