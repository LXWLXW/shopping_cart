<template>
  <div id="ensureAddress" class="animated slideInLeft">
    <h2 class="cart-title"><span class="cart-title-text">&nbsp;&nbsp;配送地址&nbsp;&nbsp;</span></h2>
    <ul class="cart-address-list">
      <li v-for="(item,index) in addresslistfilter" v-bind:class="{'odd' : index%2 == 1 , 'active' : currentIndex === index||item.isHover}" class="cart-address-list-item" v-on:mouseover="changeStyle(index,true)" v-on:mouseout="changeStyle(index,false)">
        <p class="cart-address-name" v-text="item.name">littlebowl</p>
        <p class="cart-address-detail" v-text="item.detail">深圳市福田区莲花山顶某一间房</p> 
        <p class="cart-address-phone" v-text="item.phone">13580512312</p>
        <p class="cart-address-default active" v-if="currentIndex === index">默认地址</p>
        <p class="cart-address-default" v-if="currentIndex !== index" v-on:click="currentIndex = index" v-bind:class="{'active' : item.isHover}">设为默认</p>
        <i class="cart-address-reset" v-show="item.isHover"></i>
        <i class="cart-address-delete" v-show="item.isHover"></i>
      </li>
    </ul>
    <p class="cart-address-expand" v-on:click="showMore()">more<span class="cart-address-expand-icon" v-bind:class="{'icon-expand': (showNum == addresslist.length)}"></span></p>
    <h2 class="cart-title"><span class="cart-title-text">&nbsp;&nbsp;配送方式&nbsp;&nbsp;</span></h2>
    <ul class="cart-shipping-list">
      <li class="cart-shipping-list-item"><span class="cart-shipping-item" v-bind:class="{'active':shippingType === 0}" v-on:click="shippingType = 0">到付</span></li>
      <li class="cart-shipping-list-item"><span class="cart-shipping-item" v-bind:class="{'active':shippingType === 1}" v-on:click="shippingType = 1">现付</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ensureAddress',
  data () {
    return {
      addresslist: [],
      showNum: 2,
      currentIndex: 0,
      shippingType: 0,
      isMore: true
    }
  },
  computed: {// 计算属性不能写成return
    addresslistfilter: function () { // splice ensure not to modify the origin array
      return this.addresslist.slice(0, this.showNum)
    }
  },
  mounted: function () {
    var that = this
    that.$nextTick(function () {
      that.$http({
        method: 'GET',
        url: '../static/address.json'
      }).then(function (response) {
        // 赋值给alllist数组
        this.addresslist = response.body.result
      })
    })
  },
  methods: {
    changeStyle: function (index, flag) {
      var obj = this.addresslist[index]
      var isTrue = flag
      this.$set(obj, 'isHover', isTrue)
    },
    showMore: function () {
      this.showNum = this.isMore ? this.addresslist.length : 2
      this.isMore = !this.isMore
    }
  }
}
</script>

<style>
  @import '../../static/css/style.css';
</style>
