<template>
  <div class="container">
    <!-- Loading state -->
    <div v-if="loading" class="d-flex justify-content-center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    
    <!-- Error state -->
    <div v-else-if="error" class="alert alert-danger" role="alert">
      Error loading products: {{ error }}
    </div>
    
    <!-- Products grid -->
    <div v-else class="row">
      <div class="col-lg-3 col-sm col-md-4 d-flex justify-content-center favourite" 
           @click.prevent="detailProducts(data.id)" 
           type="button" 
           v-for="data in products" 
           :key="data.id">
        <div class="product-box d-flex align-items-center flex-column">
          <div class="container-img">
            <div class="product-img overflow-hidden">
              <img :src="data.images || data.imageUrl || '/default-product.jpg'" 
                   :alt="data.name"
                   @error="handleImageError">
            </div>
          </div>
          <div class=" d-flex flex-column justify-content-between h-100">
            <p class="product-name">{{ data.name }}</p>
            <p class="product-price">IDR {{ formatPrice(data.price) }}</p>
          </div>
        </div>
      </div>
      
      <!-- Empty state -->
      <div v-if="!loading && !error && products.length === 0" class="col-12 text-center py-5">
        <p class="text-muted">No coffee products available</p>
      </div>
    </div>
    
    <!-- Pagination -->
    <b-pagination
      v-if="rows > perPage"
      v-model="currentPages"
      :per-page="perPage"
      :total-rows="rows"
      aria-controls="itemList"
      class="mt-3 float-right"
    ></b-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'Coffee',
	data () {
		return {
			currentPages: 1,
			perPage: 10,
			categoryId: 1 // Coffee category ID
		}
	},
	computed: {
		...mapGetters('products', ['products', 'loading', 'error', 'pagination']),
		rows() {
			return this.pagination.total || 0
		}
	},
	mounted() {
		this.fetchCoffeeProducts()
	},
	watch: {
		currentPages(val) {
			this.fetchCoffeeProducts()
		}
	},
	methods: {
		...mapActions('products', ['fetchAvailableProducts']),
		
		async fetchCoffeeProducts() {
			try {
				const params = {
					page: this.currentPages,
					size: this.perPage,
					categoryId: this.categoryId,
					sort: 'name:asc'
				}
				
				await this.fetchAvailableProducts(params)
			} catch (error) {
				console.error('Error fetching coffee products:', error)
			}
		},
		
		detailProducts(productId) {
			// Check user role from the auth store
			const user = JSON.parse(localStorage.getItem('user') || '{}')
			
			if (user.role === 'ADMIN') {
				this.$router.push(`/admin/edit-product?id=${productId}`)
			} else {
				this.$router.push({ path: 'product-d', query: { id: productId } })
			}
		},
		
		formatPrice(price) {
			return (price || 0).toLocaleString('id-ID')
		},
		
		handleImageError(event) {
			event.target.src = '/default-product.jpg'
		}
	}
}
</script>

<style lang="scss" scoped>
.favourite {
  margin: 0 0 80px 0;
}
p {
  margin: 0
}

.row {
  padding: 80px 0 0 0;
}

.product-box {
  padding: 0 24px 24px 24px;
  height: 210px;
  width: 156px;
  border-radius: 30px;
  background-color: white;
  box-shadow: 0px 30px 60px rgba(57, 57, 57, 0.1);
}

.product-img {
  border-radius: 50%;
  width: 128px;
  height: 128px;
  margin-top: -35%;
  margin-bottom: 1rem;
  background-color: #dadada;
}

.product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-name{
  text-align: center;
  font-family: Poppins;
  font-size: 22px;
  font-weight: 900;
  line-height: 22px;
  color: black;
}

.product-price{
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 25px;
  text-align: center;
  color: #6A4029;
}

</style>
