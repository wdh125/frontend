# API Service Layer Integration

## Tổng quan

Đã tạo API Service Layer hoàn chỉnh cho Vue.js frontend để tích hợp với Spring Boot backend.

## Cấu trúc thư mục

```
src/
├── services/
│   ├── api.js              # Cấu hình axios, interceptors
│   ├── authService.js      # Authentication APIs
│   ├── productService.js   # Product CRUD APIs
│   ├── categoryService.js  # Category CRUD APIs
│   ├── orderService.js     # Order APIs
│   ├── statisticsService.js # Statistics APIs
│   └── index.js           # Export tất cả services
├── store/
│   ├── modules/
│   │   ├── auth.js        # Vuex module cho auth
│   │   ├── products.js    # Vuex module cho products
│   │   └── statistics.js  # Vuex module cho statistics
│   └── index.js          # Main store
```

## Cách sử dụng

### 1. Authentication

```javascript
// Trong component
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'currentUser', 'isAdmin'])
  },
  methods: {
    ...mapActions('auth', ['login', 'logout']),
    
    async handleLogin() {
      try {
        await this.login({
          username: 'admin',
          password: '123456'
        })
        // Redirect sau khi đăng nhập thành công
      } catch (error) {
        console.error('Lỗi đăng nhập:', error)
      }
    }
  }
}
```

### 2. Products

```javascript
// Trong component
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('products', ['allProducts', 'availableProducts', 'isLoading'])
  },
  methods: {
    ...mapActions('products', ['fetchAllProducts', 'createProduct']),
    
    async loadProducts() {
      try {
        await this.fetchAllProducts({
          categoryId: 1,
          isAvailable: true
        })
      } catch (error) {
        console.error('Lỗi tải sản phẩm:', error)
      }
    }
  },
  mounted() {
    this.loadProducts()
  }
}
```

### 3. Statistics (Dashboard)

```javascript
// Trong dashboard component
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('statistics', ['overview', 'revenue', 'topCustomers'])
  },
  methods: {
    ...mapActions('statistics', ['fetchOverview', 'fetchRevenue']),
    
    async loadDashboardData() {
      try {
        await Promise.all([
          this.fetchOverview(),
          this.fetchRevenue({
            from: '2024-01-01',
            to: '2024-12-31'
          })
        ])
      } catch (error) {
        console.error('Lỗi tải thống kê:', error)
      }
    }
  }
}
```

## Tính năng chính

### 1. Auto Token Management
- Tự động thêm JWT token vào header
- Tự động refresh token khi hết hạn
- Tự động logout khi refresh token hết hạn

### 2. Error Handling
- Xử lý lỗi tập trung
- Hiển thị thông báo lỗi bằng SweetAlert2
- Loading states cho UX tốt hơn

### 3. Vuex Integration
- State management tập trung
- Actions async/await
- Getters computed properties

## API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/logout` - Đăng xuất
- `POST /api/auth/refresh` - Refresh token

### Products (Admin)
- `GET /api/products` - Lấy tất cả sản phẩm
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/{id}` - Cập nhật sản phẩm
- `DELETE /api/products/{id}` - Xóa sản phẩm
- `PATCH /api/products/{id}/toggle-available` - Bật/tắt sản phẩm

### Products (Customer)
- `GET /api/products/available` - Lấy sản phẩm có sẵn
- `GET /api/products/category/{id}` - Lấy sản phẩm theo danh mục

### Categories
- `GET /api/categories` - Lấy tất cả danh mục (Admin)
- `GET /api/categories/active` - Lấy danh mục đang hoạt động (Customer)
- `POST /api/categories` - Tạo danh mục mới
- `PUT /api/categories/{id}` - Cập nhật danh mục

### Orders
- `POST /api/orders` - Tạo đơn hàng mới
- `GET /api/orders/my-orders` - Lấy đơn hàng của tôi

### Statistics (Admin)
- `GET /api/admin/statistics/overview` - Thống kê tổng quan
- `GET /api/admin/statistics/revenue` - Thống kê doanh thu
- `GET /api/admin/statistics/orders` - Thống kê đơn hàng
- `GET /api/admin/statistics/top-customers` - Top khách hàng
- `GET /api/admin/statistics/top-products` - Top sản phẩm

## Cấu hình

### Base URL
Mặc định: `http://localhost:8080/api`

Có thể thay đổi trong `src/services/api.js`:

```javascript
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8080/api',
  // ...
})
```

### Environment Variables
Tạo file `.env`:

```env
VUE_APP_API_URL=http://localhost:8080/api
```

## Testing

### 1. Test Authentication
```javascript
// Test login
const response = await authService.login({
  username: 'admin',
  password: '123456'
})
console.log('Login response:', response)
```

### 2. Test Products
```javascript
// Test get products
const products = await productService.getAllProducts()
console.log('Products:', products)
```

### 3. Test Statistics
```javascript
// Test statistics
const overview = await statisticsService.getOverviewStatistics()
console.log('Overview:', overview)
```

## Lưu ý quan trọng

1. **CORS**: Đảm bảo backend đã cấu hình CORS cho frontend
2. **Token Storage**: JWT token được lưu trong localStorage
3. **Error Handling**: Tất cả lỗi được xử lý tập trung
4. **Loading States**: Sử dụng loading states cho UX tốt hơn
5. **Type Safety**: Có thể thêm TypeScript để type safety tốt hơn

## Bước tiếp theo

1. Tích hợp vào các component hiện tại
2. Thêm route guards cho authentication
3. Tạo components cho CRUD operations
4. Thêm form validation
5. Tối ưu performance với caching 