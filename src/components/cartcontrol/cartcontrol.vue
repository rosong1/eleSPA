<template>
<div class="cartcontrol">
	<transition name="fade">
		<div class="cart-decrease" v-show="food.count > 0" @click="decreaseCart($event)"><i class="iconfont">&#xe629;</i></div>
	</transition>
	<div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
	<div class="cart-plus" @click="addCart($event)"><i class="iconfont">&#xe602;</i></div>
</div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
export default {
  props: {
  	food: {
  		type: Object
  	}
  },
  methods: {
  	addCart(event) {
  	  if (!event._constructed) {
  	  	return;
  	  }
  	  if (!this.food.count) {
  	  	Vue.set(this.food, 'count', 1);
  	  } else {
  	  	this.food.count++;
  	  }
  	},
  	decreaseCart(event) {
  	  if (!event._constructed) {
  	  	return;
  	  }
  	  this.food.count--;
  	}
  },
  created() {
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
	.cartcontrol
	  font-size: 0	
	  .cart-decrease,.cart-plus
	  	display: inline-block
	  	cursor: pointer
	  .cart-decrease
	  	transition: all .3s	linear
	  	.iconfont
	  	  font-size: 22px
	  	  color: #00a0dc
	  	  line-height : 48px
	  	  padding: 6px
	  	&.fade-enter-active, &.fade-leave
	  	  opacity: 1
	  	  transform: translate3D(0, 0, 0) rotate(0deg)
	  	&.fade-enter, &.fade-leave-active
	  	  opacity: 0
	  	  transform: translate3D(22px, 0, 0) rotate(360deg)	  	  
	  .cart-count
	  	display: inline-block
	  	font-size: 12px
	  	vertical-align: text-bottom
	  	color: rgb(147, 153, 159)
	  	padding: 0 6px
	  .cart-plus
	  	.iconfont
	  	  font-size: 24px
	  	  color: #00a0dc
	  	  line-height : 48px
	  	  padding: 6px	
</style>
