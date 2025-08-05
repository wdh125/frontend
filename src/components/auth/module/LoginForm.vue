<template>
  <div class="group-form">
    <form @submit.prevent="">
      <Inputed
        id="username"
        type="text"
        placeholder="Enter your username"
        label="Username :"
        v-model="username"
        @keyup="checkUsername"
      />
			<div v-if="isUsername" class="mb-3 text-danger validation">Username is required</div>
      <Inputed
        id="password"
        type="password"
        placeholder="Enter your password"
        label="Password :"
        v-model="pass"
        @keyup="checkPassword"
      />
			<div v-if="isPass" class=" mb-3 text-danger validation">Your password must be 8 character</div>
      <router-link to="/auth/forgot" class="forgot"
        >Forgot Password?</router-link
      >
      <div class="mb-5"></div>
      <Button
        color="btn-yellow btn-auth"
        label="Login"
        :nonActiveImg="1"
        @click="login"
      ></Button>
    </form>
    <Button
      color="btn-white-auth"
      label="Login With Google"
      :nonActiveImg="0"
    ></Button>
    <TextMuted text="Don't have an account?"></TextMuted>
    <!-- <router-link to="/auth/signup"> -->
    <Button
      color="btn-brown btn-auth"
      label="Sign Up Here"
      :nonActiveImg="1"
      @click="goSignUp"
    ></Button>
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
	name: 'LoginForm',
	components: {
		Button,
		Inputed,
		TextMuted
	},
	data () {
		return {
			pass: '',
			username: '',
			messages: '',
			isUsername: 0,
			isPass: 0
		}
	},
	methods: {
		goSignUp () {
			this.$router.push('/auth/signup')
		},

		checkPassword () {
			this.isPass = this.pass.length > 0 && this.pass.length < 8
		},
		checkUsername () {
			this.isUsername = this.username.length === 0
		},
		async login () {
			const username = this.username
			const password = this.pass
			const user = {
				username,
				password
			}
			if (user.username.length < 1) {
				return Swal.fire({
					icon: 'error',
					title: 'Fill the blank username'
				})
			} else if (user.password.length < 1) {
				return Swal.fire({
					icon: 'error',
					title: 'Fill the blank password'
				})
			}

			try {
				// Sử dụng Vuex auth service thay vì axios trực tiếp
				const res = await this.$store.dispatch('auth/login', user)
				console.log('Login response:', res)
				console.log('User role:', res.role)

				// Hiện thông báo thành công và tự tắt sau 1 giây
				Swal.fire({
					icon: 'success',
					title: 'Success Login',
					timer: 1000,
					showConfirmButton: false,
					allowOutsideClick: false,
					allowEscapeKey: false
				})

				// Đợi 1 giây rồi redirect
				setTimeout(() => {
					if (res.role === 'ROLE_ADMIN') {
						console.log('Redirecting to admin dashboard')
						this.$router.push('/admin/dashboard')
					} else {
						console.log('Redirecting to customer product')
						this.$router.push('/cust/product')
					}
				}, 1000)
			} catch (err) {
				console.error('Login error:', err)
				Swal.fire({
					icon: 'error',
					title: err.response?.data?.message || 'Login failed'
				})
				this.messages = err.response?.data?.message || 'Login failed'
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

.forgot {
  font-family: Rubik;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  text-decoration-line: underline;
  color: #6a4029;
  transition: 0.3s;
}

.forgot:hover {
  opacity: 0.8;
}
</style>
