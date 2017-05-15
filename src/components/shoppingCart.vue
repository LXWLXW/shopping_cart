<template>
  <div id="shoppingCart" class="animated slideInLeft">
    <h2 class="cart-title"><span class="cart-title-text">&nbsp;&nbsp;购物车&nbsp;&nbsp;</span></h2>
    <ul class="cart-goods-list">
      <div class="cart-goods-list-title">
        <div class="list-column-1">&nbsp;</div>
        <div class="list-column-2">商品信息</div>
        <div class="list-column-3">商品金额</div>
        <div class="list-column-4">商品数量</div>
        <div class="list-column-5">总金额</div>
        <div class="list-column-6">编辑</div>
      </div>
      <li v-for="(item,index) in goodslist" class="cart-goods-list-item">
        <div class="list-column-1">
          <span class="select-icon-wrapper" v-on:click="selectOrNot(index)">
            <transition name="selectBtn" mode="out-in"> 
              <i class="select-icon-down" v-if="!item.selected"></i> 
            </transition>    
            <transition name="selectBtn" mode="out-in">                      
              <i class="select-icon-up" v-if="item.selected"></i>
            </transition>
          </span>
        </div>
        <div class="list-column-2">
          <img class="cart-goods-img" v-bind:src="item.imgSrc">
          <div class="cart-goods-detail">
            <h3 class="cart-goods-name" v-text="item.name"></h3>
            <p class="cart-goods-des" v-text="item.des">这是一件很可爱的物品哦这是一件很可爱的物品哦</p>          
          </div>
        </div>
        <div class="list-column-3">￥<span class="fc-orange" v-text="item.price.toFixed(2)"></span></div>
        <div class="list-column-4">
          <i class="cart-goods-sub" v-on:click="changeAmount(-1, index)">- </i>
          <span class="cart-goods-amount" v-text="item.amount"></span>
          <i class="cart-goods-add" v-on:click="changeAmount(1,index)"> +</i>
        </div>
        <div class="list-column-5">￥<span class="fc-orange" v-text="item.totalPrice.toFixed(2)"></span></div>
        <div class="list-column-6"><i class="cart-goods-delete-icon" v-on:click="deleteItem(index)"></i></div>     
      </li>
    </ul>
    <div class="cart-goods-buy">
      <span class="select-icon-outer-wrapper">
        <span class="select-icon-wrapper" v-on:click="selectAll()">
          <i class="select-icon-down" v-if="!isSelectAll"></i>
          <i class="select-icon-up" v-if="isSelectAll"></i>
        </span>     
      </span>
      <span class="cart-goods-select-all fc-orange" v-on:click="selectAll(1)">全选</span>
      <span class="cart-goods-select-none" v-on:click="selectAll(-1)">取消全选</span>
      <span class="cart-goods-total">
        总计：<span class="buy-btn" href="javascript;" v-on:click="calculate()">结账</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'shoppingCart',
  data () {
    return {
      goodslist: [],
      isSelectAll: false
    }
  },
  transitions: {
    bounce: {
      enterClass: 'bounceInLeft',
      leaveClass: 'bounceOutRight'
    }
  },
  mounted: function () {
    var that = this
    that.$nextTick(function () {
      that.$http({
        method: 'GET',
        url: '../static/goods.json'
      }).then(function (response) {
        // 赋值给alllist数组
        var goodlist = that.goodslist = response.body.result
        for (var i = 0; i < goodlist.length; i++) {
          var obj = goodlist[i]
          this.$set(obj, 'totalPrice', obj.price * obj.amount)
        }
      })
    })
  },
  methods: {
    changeAmount: function (flag, index) {
      var obj = this.goodslist[index]
      if (flag === -1) {
        obj.amount = obj.amount > 1 ? obj.amount - 1 : 1
      } else if (flag === 1) {
        obj.amount ++
      }
      this.$set(obj, 'totalPrice', obj.price * obj.amount)
    },
    selectOrNot: function (index) {
      var obj = this.goodslist[index]
      this.$set(obj, 'selected', !obj.selected)
    },
    selectAll: function (flag) {
      if (flag === 1) {
        this.isSelectAll = true
      } else if (flag === -1) {
        this.isSelectAll = false
      } else {
        this.isSelectAll = !this.isSelectAll
      }
      var list = this.goodslist
      for (var i = 0; i < list.length; i++) {
        this.$set(list[i], 'selected', this.isSelectAll)
      }
    },
    deleteItem: function (index) {
      this.goodslist.splice(index, 1)
    },
    calculate: function () {
      var list = this.goodslist
      var totalPrice = 0
      for (var i = 0; i < list.length; i++) {
        if (list[i].selected) {
          totalPrice += parseFloat(list[i].totalPrice)
        }
      }
      this.$router.push({name: 'buyStep', query: { totalPrice: totalPrice }})
    }
  }
}
</script>

<style>
  @import '../../static/css/style.css';
</style>
