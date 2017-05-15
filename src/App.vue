<template>
  <router-view></router-view>
</template>

<script>
import 'animate.css'
export default {
  name: 'app',
  mounted: function () {
    this.$nextTick(function () {
      this.$router.push({name: 'shoppingCart'})
    })
  }
}
</script>

<style>
  @import '../static/css/style.css';
</style>

