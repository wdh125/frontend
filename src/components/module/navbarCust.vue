<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <router-link to="/" class="navbar-brand" style="text-decoration: none;">
            <img src="../../assets/img/coffee 1.png" alt="">Coffee Shop
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav option-box">
                <li class="nav-item option">
                    <router-link to="/cust/product" exact tag="li"><a class="nav-link" :class="this.$route.path === '/cust/product' ? 'active-tab-navbar':'inactive-tab-navbar'" href="#">Products</a></router-link>
                </li>
                <li class="nav-item option">
                    <router-link to="/cust/cart" exact tag="li"><a class="nav-link" :class="this.$route.path === '/cust/cart' ? 'active-tab-navbar':'inactive-tab-navbar'" href="#">Your Cart</a></router-link>
                </li>
                <li class="nav-item option">
                    <router-link to="/cust/history" exact tag="li"><a class="nav-link" :class="this.$route.path === '/cust/history' ? 'active-tab-navbar':'inactive-tab-navbar'" href="#">History</a></router-link>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto option-box2">
                <li class="nav-item d-flex option2" style="position: relative;">
                    <div class="user-photo" @click="toggleDropdown" style="cursor: pointer;">
                        <img src="https://via.placeholder.com/30x30/6A4029/FFFFFF?text=U" alt="User Avatar">
                    </div>
                    <div v-if="showDropdown" class="custom-dropdown">
                        <a class="dropdown-item" href="#" @click.prevent="goProfile">Profile</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" @click.prevent="logout">Logout</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	name: 'Navbar',
	methods: {
		...mapActions({
			getCustProfile: 'getCustProfile',
			logoutAction: 'auth/logout'
		}),

		toggleDropdown() {
			this.showDropdown = !this.showDropdown
		},
		goProfile () {
			this.showDropdown = false
			this.$router.push('/cust/profile')
		},
		async logout() {
			try {
				this.showDropdown = false
				await this.logoutAction()
				this.$router.push('/auth/login')
			} catch (error) {
				console.error('Logout error:', error)
				this.$router.push('/auth/login')
			}
		}
	},
	data () {
		return {
			image: 'https://www.searchpng.com/wp-content/uploads/2019/02/Deafult-Profile-Pitcher.png',
			showDropdown: false
		}
	},
	computed: {
		...mapGetters(['getProfile'])
	},
	mounted () {
		// Tạm thời comment out để tránh lỗi 403
		// this.getCustProfile()
	}

}
</script>

<style lang="scss" scoped>
#navbarNav {
    background-color: white;
}

.active-tab-navbar {
    font-family: Rubik;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: #6A4029!important;
}

.inactive-tab-navbar {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #4F5665;
}

.navbar-toggler {
    border: none;
    outline: none;
    margin-right: 5%;
}
nav {
    height: 100px;
    border-bottom: 0.5px solid #9F9F9F;
    background-color: white;
    z-index: 999;
}
.navbar-brand {
    margin-left: 5%;
    margin-right: 10%;
    font-family: Rubik;
    font-size: 20px;
    font-weight: 700;
    color: #0B132A;
}
.navbar-brand img {
    margin-right: 10%;
}
.option-box {
    width: 50%;
}
.option {
    width: 100%;
    text-align: center;
    font-family: Rubik;
    font-size: 16px;
    font-weight: 400;
    color: #4F5665;
}
.option2 {
    margin-right: 8%;
}
.option-box2 {
    display: flex;
    align-items: center;
    justify-content:flex-end;
    width: 30%;
    margin-right:10%;
}
img {
    width: 30px;
    height: 30px;
}
.user-photo {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.custom-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 1000;
    min-width: 120px;
    margin-top: 5px;
    white-space: nowrap;
}

.dropdown-item {
    display: block;
    padding: 8px 16px;
    color: #333;
    text-decoration: none;
    font-size: 14px;
    transition: background-color 0.2s;
}

.dropdown-item:hover {
    background-color: #f8f9fa;
    text-decoration: none;
    color: #333;
}

.dropdown-divider {
    height: 1px;
    background-color: #ddd;
    margin: 4px 0;
}
@media screen and (max-width: 991px) {
    .option-box {
        width: 100%;
    }
    .option-box2 {
        width: 100%;
    }
    img {
        margin-bottom: 3%;
    }
    .user-photo {
        border-radius: 50%;
    }
    .option2 {
        margin-right: 0%;
        margin-bottom: 2%
    }
}
</style>
