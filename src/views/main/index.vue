<template>
    <div class="content">
        <Navbar/>
        <div class="container-fluid">
            <router-view/>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Navbar from '../../components/module/navbarCust.vue'
import Footer from '../../components/module/footer.vue'
export default {
	name: 'MainCustomer',
	components: {
		Navbar,
		Footer
	},
	title: 'Products'
}
</script>

<style lang="scss" scoped>
.content {
  background-color:  #ffffff;
}
.container-fluid {
  width: 100%;
    margin: 0;
    padding: 0;
}

</style>
