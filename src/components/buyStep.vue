<template>
  <div id="buyStep" class="animated slideInDown">
    <ul class="cart-step-wrapper">
      <li v-bind:class="{'active':isActive === 0}" class="cart-step" v-on:click="chooseStep('/buyStep/ensureAddress', 0)">地址确认</li>
      <li v-bind:class="{'active':isActive === 1}" class="cart-step" v-on:click="chooseStep('/buyStep/showBook', 1)">查看订单</li>
    </ul>
    <router-view class="animated" transition="rotateIn"></router-view>
  </div>
</template>

<script>
export default {
  name: 'buyStep',
  data () {
    return {
      isActive: 0
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.$router.push({path: '/buyStep/ensureAddress'})
    })
  },
  methods: {
    chooseStep: function (choosePath, active) {
      this.$router.push({path: choosePath})
      this.isActive = active
    }
  }
}
</script>

<style>
  @import '../../static/css/style.css';
</style>
