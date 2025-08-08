import { createRouter, createWebHistory } from 'vue-router'

// import Landing from '../views/Landing.vue'
import Landing from '../views/Landing2.vue'

// Auth (Sign Up, Login, Forgot)
import MainAuth from '../views/auth/MainAuth.vue'
import SignUp from '../views/auth/SignUp.vue'
import Login from '../views/auth/Login.vue'
import Forgot from '../views/auth/Forgot.vue'
import newPassword from '../views/auth/newPassword.vue'
// Customer
import Customer from '../views/main/index.vue'
import Product from '../views/main/product/product.vue'
import Cart from '../views/main/cart/cart.vue'
import History from '../views/main/History/history.vue'
import ProductDetail from '../views/customer/ProductDetail.vue'
import Profile from '../views/customer/Profile.vue'
import editPassword from '../views/customer/editPassword.vue'
import HomeCust from '../views/Home/Customer/customer.vue'
// Admin
import Admin from '../views/admin/index.vue'
import NewProduct from '../views/admin/NewProduct.vue'
import ManageOrder from '../views/admin/manage order/manageorder.vue'
import BeforeManageOrder from '../views/admin/manage order/beforemanageorder.vue'
import ProductAdmin from '../views/admin/product/index.vue'
import Dashboard from '../views/admin/dashboard/dashboard.vue'
import HomeAdm from '../views/Home/Admin/admin.vue'
import EditProduct from '../views/admin/EditProduct.vue'
import TestAPI from '../components/TestAPI.vue'
import APITestDashboard from '../components/APITestDashboard.vue'
// import EditPasswordAdmin from '../views/customer/editPassword.vue'

const routes = [
	{
		path: '/',
		name: 'Landing',
		component: Landing
	},
	{
		path: '/login',
		redirect: '/auth/login'
	},
	{
		path: '/auth',
		name: 'MainAuth',
		component: MainAuth,
		redirect: '/auth/signup',
		meta: { requiresVisitor: true },
		children: [
			{
				path: 'signup',
				name: 'SignUp',
				component: SignUp,
				meta: { requiresVisitor: true }
			},
			{
				path: 'login',
				name: 'Login',
				component: Login,
				meta: { requiresVisitor: true }
			},
			{
				path: 'forgot',
				name: 'Forgot',
				component: Forgot,
				meta: { requiresVisitor: true }
			},
			{
				path: 'new-password/:token',
				name: 'newPassword',
				component: newPassword,
				meta: { requiresVisitor: true }
			}
		]
	},
	{
		path: '/cust',
		name: 'Customer',
		component: Customer,
		redirect: '/cust/product',
		meta: { requiresAuth: true },
		children: [
			{
				path: 'product-d',
				name: 'ProductDetail',
				component: ProductDetail,
				meta: { requiresAuth: true }
			},
			{
				path: 'profile',
				name: 'Profile',
				component: Profile,
				meta: { requiresAuth: true }
			},
			{
				path: 'product',
				name: 'Product',
				component: Product,
				meta: { requiresAuth: true }
			},
			{
				path: 'cart',
				name: 'Cart',
				component: Cart,
				meta: { requiresAuth: true }
			},
			{
				path: 'history',
				name: 'History',
				component: History,
				meta: { requiresAuth: true }
			},
			{
				path: 'edit-password',
				name: 'editPassword',
				component: editPassword,
				meta: { requiresAuth: true }
			},
			{
				path: 'home',
				name: 'HomeCust',
				component: HomeCust,
				meta: { requiresAuth: true }
			}
		]
	},
	{
		path: '/admin',
		name: 'Admin',
		component: Admin,
		redirect: '/admin/dashboard',
		meta: { requiresAuth: true },
		children: [
			{
				path: 'edit-password',
				name: 'EditPasswordAdmin',
				component: editPassword,
				meta: { requiresAuth: true }
			},
			{
				path: 'profile',
				name: 'AdminProfile',
				component: Profile,
				meta: { requiresAuth: true }
			},
			{
				path: 'add-product',
				name: 'NewProduct',
				component: NewProduct,
				meta: { requiresAuth: true }
			},
			{
				path: 'manage-order',
				name: 'ManageOrder',
				component: ManageOrder,
				meta: { requiresAuth: true }
			},
			{
				path: 'bmanage-order',
				name: 'BeforeManageOrder',
				component: BeforeManageOrder,
				meta: { requiresAuth: true }
			},
			{
				path: 'product-admin',
				name: 'ProductAdmin',
				component: ProductAdmin,
				meta: { requiresAuth: true }
			},
			{
				path: 'dashboard',
				name: 'Dashboard',
				component: Dashboard,
				meta: { requiresAuth: true }
			},
			{
				path: 'edit-product',
				name: 'EditProduct',
				component: EditProduct,
				meta: { requiresAuth: true }
			},
			{
				path: 'home',
				name: 'HomeAdm',
				component: HomeAdm,
				meta: { requiresAuth: true }
			}
		]
	},
	{
		path: '/test-api',
		name: 'TestAPI',
		component: TestAPI
	},
	{
		path: '/api-dashboard',
		name: 'APITestDashboard',
		component: APITestDashboard
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	// Clear token cũ khi vào trang auth (để tránh redirect)
	if (to.path.startsWith('/auth/')) {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('user')
	}

	// Đặc biệt clear khi vào signup để tránh redirect
	if (to.path === '/auth/signup') {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('user')
	}

	// Xử lý trang Landing (/) - cho phép user đã login xem
	if (to.path === '/') {
		// Cho phép cả user đã login và chưa login xem trang Home
		next()
	} else if (to.matched.some(record => record.meta.requiresAuth)) {
		const token = localStorage.getItem('accessToken')
		const user = localStorage.getItem('user')
		
		if (!token) {
			// Thông báo khi bị logout
			if (from.path !== '/auth/login' && from.path !== '/auth/signup') {
				console.log('Session expired. Redirecting to login...')
			}
			next({ path: '/auth/login' })
		} else {
			// Kiểm tra role-based access
			if (user) {
				const userData = JSON.parse(user)
				
				// Kiểm tra nếu user là admin và đang truy cập admin routes
				if (to.path.startsWith('/admin') && userData.role !== 'ADMIN') {
					next({ path: '/cust/product' })
					return
				}
				
				// Kiểm tra nếu user là customer và đang truy cập customer routes
				if (to.path.startsWith('/cust') && userData.role !== 'USER') {
					next({ path: '/admin/dashboard' })
					return
				}
			}
			
			next()
		}
	} else if (to.matched.some(record => record.meta.requiresVisitor)) {
		// Chỉ redirect nếu có token và đang truy cập trang auth (trừ signup)
		if (localStorage.getItem('accessToken') && to.path !== '/auth/signup') {
			// Kiểm tra role để redirect đúng
			const user = localStorage.getItem('user')
			if (user) {
				const userData = JSON.parse(user)
				if (userData.role === 'ADMIN') {
					next({ path: '/admin/dashboard' })
				} else {
					next({ path: '/cust/product' })
				}
			} else {
				next({ path: '/cust/product' })
			}
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
