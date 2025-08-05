<template>
    <div class="container">
        <h1>See how your store progress so far</h1>
        <div class="top">
            <div class="filter-logo" type=button>
                <img src="../../../assets/img/date settings.png" alt="">
                <p>Filter</p>
            </div>
            <p>15 April - 21 April 2020</p>
            <div class="left" type= button> &laquo; </div>
            <div class="right" type= button> &raquo; </div>
        </div>
        <div class="content">
            <div class="leftside">
                <div class="graphic">
                    <h2>Báo cáo tháng</h2>
                    <p v-if="overview">{{ dateRange.from }} - {{ dateRange.to }}</p>
                    <div v-if="isLoading" class="loading">Đang tải dữ liệu...</div>
                    <div ref="chart" class="chart"></div>
                </div>
                <button class="button">Tải báo cáo</button>
            </div>
            <div class="rightside">
                <div class="beststaff">
                    <div class="best-profile">
                        <div class="best-photo">
                            <img src="../../../assets/img/UI Element/Light/Donut/image 51.png" alt="">
                        </div>
                        <div class="best-name">
                            <p class="name">{{ topCustomers?.topCustomer?.name || 'Chưa có dữ liệu' }}</p>
                            <p class="description">{{ topCustomers?.topCustomer?.description || 'Khách hàng tiềm năng' }}</p>
                        </div>
                    </div>
                    <p class="title">Khách hàng xuất sắc</p>
                    <div class="staff-perf">
                        <img src="../.././../assets/img/UI Element/Light/Donut/UI elements/Donut/Donut/size 01-color-01.png" alt="">
                    </div>
                    <p class="info" v-if="topCustomers">
                        Đã mua {{ topCustomers.topCustomer?.totalSpent?.toLocaleString() || 0 }} VND<br>
                        {{ topCustomers.topCustomer?.orderCount || 0 }} đơn hàng
                    </p>
                    <p class="info" v-else>Chưa có dữ liệu</p>
                </div>
                <div class="goals">
                    <p class="goal-title">Mục tiêu</p>
                    <p class="goal-desc" v-if="overview">
                        Doanh thu hiện tại: {{ overview.totalRevenue?.toLocaleString() || 0 }} VND
                    </p>
                    <p class="goal-desc" v-else>Đang tải dữ liệu...</p>
                    <div class="goal-graph">
                        <img src="../.././../assets/img/UI Element/Light/Donut/UI elements/Donut/Donut/size 01-color-01.png" alt="">
                    </div>
                </div>
                <button class="button">Chia sẻ báo cáo</button>
            </div>
        </div>
    </div>
</template>

<script>
import ApexCharts from 'apexcharts/dist/apexcharts.js'
import { mapActions, mapGetters } from 'vuex'

export default {
	title: 'Dashboard',
	name: 'Dashboard',
	data() {
		return {
			chart: null,
			dateRange: {
				from: '2024-01-01',
				to: '2024-12-31'
			}
		}
	},
	computed: {
		...mapGetters('statistics', [
			'overview',
			'revenue',
			'orders',
			'topCustomers',
			'topProducts',
			'isLoading',
			'error'
		]),
		...mapGetters('auth', ['isAuthenticated', 'isAdmin', 'currentUser'])
	},
	methods: {
		...mapActions('statistics', [
			'fetchOverview',
			'fetchRevenue',
			'fetchOrders',
			'fetchTopCustomers',
			'fetchTopProducts'
		]),

		async loadDashboardData() {
			try {
				await Promise.all([
					this.fetchOverview(),
					this.fetchRevenue(this.dateRange),
					this.fetchOrders(this.dateRange),
					this.fetchTopCustomers(5),
					this.fetchTopProducts(5)
				])
				this.updateChart()
			} catch (error) {
				console.error('Lỗi khi tải dữ liệu dashboard:', error)
			}
		},

		updateChart() {
			if (this.revenue && this.$refs.chart) {
				const options = {
					chart: {
						height: 420,
						type: 'bar'
					},
					dataLabels: {
						enabled: false
					},
					stroke: {
						curve: 'smooth'
					},
					series: [
						{
							name: 'Doanh thu',
							data: this.revenue.dailyRevenue || [3, 5, 4.5, 4, 4.5, 4],
							color: '#FFBA33'
						},
						{
							name: 'Chi phí',
							data: this.revenue.dailyCosts || [-1, -1.5, -2, -1, -1.5, -2],
							color: '#6A4029'
						}
					],
					xaxis: {
						type: 'varchar',
						categories: this.revenue.dates || ['15', '16', '17', '18', '19', '20']
					},
					yaxis: {
						labels: {
							formatter: function (value) {
								return 'VND ' + value.toLocaleString()
							}
						}
					}
				}

				if (this.chart) {
					this.chart.destroy()
				}
				this.chart = new ApexCharts(this.$refs.chart, options)
				this.chart.render()
			}
		}
	},
	mounted() {
		// Kiểm tra authentication trước khi load data
		if (!this.isAuthenticated) {
			this.$router.push('/auth/login')
			return
		}

		if (!this.isAdmin) {
			this.$router.push('/')
			return
		}

		this.loadDashboardData()
	},
	watch: {
		revenue() {
			this.updateChart()
		}
	}
}
</script>

<style lang="scss" scoped>
.goal-title {
    text-align: center;
    font-family: Nunito Sans;
    font-size: 22px;
    font-weight: 700;
    color: #000000;
}
.goal-desc {
    text-align: center;
    font-family: Nunito Sans;
    font-size: 16px;
    font-weight: 400;
    color: #7C828A;
}
.staff-perf {
    width: 100%;
    text-align: center;
}
.goal-graph {
    width: 100%;
    text-align: center;
}
.title {
    font-family: Poppins;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    color: #000000;
}
.info {
    font-family: Poppins;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    color: #7C828A;
}
.name {
    font-family: Poppins;
    font-size: 20px;
    font-weight: 700;
    text-align: left;
    color: #000000;
}
.description {
    font-family: Poppins;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    color: #000000;
}
.best-photo {
    height: 79px;
    width: 85px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 3%;
}
.best-photo img {
    height: 100%;
}
.best-profile{
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid  #7C828A;
}
.button {
    width: 100%;
    height: 97px;
    border-radius: 20px;
    background-color: #6A4029;
    color: #FFFFFF;
    font-family: Nunito Sans;
    font-size: 30px;
    font-weight: 700;
    border: none;
    outline: none;
    box-shadow: 5px 10px 18px #888888;
}
.left, .right {
    font-size: 60px;
    margin-right: 5%;
    margin-bottom: 3%;
}
.top, .content {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.filter-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 2%;
}
h1 {
    font-family: Rubik;
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    color: #6A4029;
    margin-bottom: 3%;
}
h2 {
    font-family: Poppins;
    font-size: 30px;
    font-weight: 700;
    text-align: left;
    color: #000000;
}
p {
    font-family: Poppins;
    font-size: 20px;
    font-weight: 400;
    text-align: left;
    color: #7C828A;
    margin-right: 5%;
}
.graphic {
    height: 100%;
    width: 100%;
    border-radius: 20px;
    background-color: #FFFFFF;
    padding-right: 5%;
    padding-left: 5%;
    padding-top: 5%;
    padding-bottom: 5%;
    margin-bottom: 12%;
    box-shadow: 5px 10px 18px #888888;
}
.rightside {
    width: 40%;
    margin-left: 5%;
}
.leftside {
    width: 60%;
}
.beststaff, .goals {
    height: 317px;
    width: 100%;
    border-radius: 20px;
    background-color: #FFFFFF;
    margin-bottom: 5%;
    box-shadow: 5px 10px 18px #888888;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 5%;
    padding-bottom: 5%;
}
@media screen and (max-width: 767px) {
    .content {
        flex-direction: column;
        width: 100%;
    }
    .leftside {
        width: 100%;
    }
    .rightside {
        width: 100%;
        margin: 0;
        margin-top: 10%;
    }
}
</style>
