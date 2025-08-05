<template>
  <div class="test-api">
    <h2>Test API Integration</h2>

    <!-- Authentication Test -->
    <div class="test-section">
      <h3>Authentication Test</h3>
      <div class="form-group">
        <input v-model="loginForm.username" placeholder="Username" />
        <input v-model="loginForm.password" type="password" placeholder="Password" />
        <button @click="testLogin" :disabled="authLoading">
          {{ authLoading ? 'Đang đăng nhập...' : 'Test Login' }}
        </button>
        <button @click="testLogout" :disabled="authLoading">Test Logout</button>
      </div>
      <div v-if="authUser" class="result">
        <p>✅ Đã đăng nhập: {{ authUser.username }} ({{ authUser.role }})</p>
      </div>
    </div>

    <!-- Products Test -->
    <div class="test-section">
      <h3>Products Test</h3>
      <button @click="testGetProducts" :disabled="productsLoading">
        {{ productsLoading ? 'Đang tải...' : 'Get Products' }}
      </button>
      <div v-if="products.length > 0" class="result">
        <p>✅ Tìm thấy {{ products.length }} sản phẩm</p>
        <ul>
          <li v-for="product in products.slice(0, 3)" :key="product.id">
            {{ product.name }} - {{ product.price }} VND
          </li>
        </ul>
      </div>
    </div>

    <!-- Statistics Test -->
    <div class="test-section">
      <h3>Statistics Test</h3>
      <button @click="testStatistics" :disabled="statsLoading">
        {{ statsLoading ? 'Đang tải...' : 'Get Statistics' }}
      </button>
      <div v-if="overview" class="result">
        <p>✅ Thống kê tổng quan:</p>
        <ul>
          <li>Tổng doanh thu: {{ overview.totalRevenue?.toLocaleString() || 0 }} VND</li>
          <li>Tổng đơn hàng: {{ overview.totalOrders || 0 }}</li>
          <li>Tổng khách hàng: {{ overview.totalCustomers || 0 }}</li>
        </ul>
      </div>
    </div>

    <!-- Error Display -->
    <div v-if="error" class="error">
      <p>❌ Lỗi: {{ error }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TestAPI',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'password123'
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'currentUser', 'isLoading']),
    ...mapGetters('products', ['allProducts', 'isLoading']),
    ...mapGetters('statistics', ['overview', 'isLoading']),

    authUser() {
      return this.currentUser
    },
    authLoading() {
      return this.$store.getters['auth/isLoading']
    },
    productsLoading() {
      return this.$store.getters['products/isLoading']
    },
    statsLoading() {
      return this.$store.getters['statistics/isLoading']
    },
    products() {
      return this.allProducts || []
    },
    error() {
      return this.$store.getters['products/error'] ||
             this.$store.getters['statistics/error'] ||
             this.$store.getters['auth/error']
    }
  },
  methods: {
    ...mapActions('auth', ['login', 'logout']),
    ...mapActions('products', ['fetchAllProducts']),
    ...mapActions('statistics', ['fetchOverview']),

    async testLogin() {
      try {
        await this.login(this.loginForm)
        console.log('✅ Login successful')
      } catch (error) {
        console.error('❌ Login failed:', error)
      }
    },

    async testLogout() {
      try {
        await this.logout()
        console.log('✅ Logout successful')
      } catch (error) {
        // Xử lý lỗi logout - có thể là text response thay vì JSON
        console.error('❌ Logout failed:', error)
        // Vẫn coi như logout thành công nếu đã clear user
        if (!this.isAuthenticated) {
          console.log('✅ User đã được logout (cleared from state)')
        }
      }
    },

    async testGetProducts() {
      try {
        await this.fetchAllProducts()
        console.log('✅ Products loaded successfully')
      } catch (error) {
        console.error('❌ Failed to load products:', error)
      }
    },

    async testStatistics() {
      try {
        await this.fetchOverview()
        console.log('✅ Statistics loaded successfully')
      } catch (error) {
        console.error('❌ Failed to load statistics:', error)
      }
    }
  },
  mounted() {
    // Check if user is already authenticated
    this.$store.dispatch('auth/checkAuth')
  }
}
</script>

<style scoped>
.test-api {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.test-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

.result {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  padding: 15px;
  margin-top: 10px;
}

.error {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 15px;
  margin-top: 10px;
}

ul {
  margin: 10px 0;
  padding-left: 20px;
}

li {
  margin: 5px 0;
}
</style>
