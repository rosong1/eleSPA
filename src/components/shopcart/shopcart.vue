<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight': totalCount > 0}">
						<i class="iconfont shopcart-logo" :class="{'highlight': totalCount > 0}">&#xe698;</i>
					</div>
					<div class="num" v-show="totalCount > 0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight': totalCount > 0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right" :class="payClass">{{payDesc}}</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
  export default {
  	props: {
  	  selectFoods: {
  	  	type: Array,
  	  	default() {
  	  		return [];
  	  	}
  	  },
	  deliveryPrice: {
	  	type: Number,
	  	default: 0
	  },
	  minPrice: {
	  	type: Number,
	  	default: 0
	  }
  	},
  	computed: {
  	  totalPrice() {
  	  	let total = 0;
  	  	this.selectFoods.forEach((food) => {
  	  	  total += food.price * food.count;
  	  	});
  	  	return total;
  	  },
  	  totalCount() {
  	  	let count = 0;
  	  	this.selectFoods.forEach((food) => {
  	  	  count += food.count;
  	  	});
  	  	return count;
  	  },
  	  payDesc() {
  	  	if (this.totalPrice === 0) {
  	  	  return `￥${this.minPrice}起送`;
  	  	} else if (this.totalPrice < this.minPrice) {
  	  	  let diff = this.minPrice - this.totalPrice;
  	  	  return `还差￥${diff}起送`;
  	  	} else {
  	  	  return `去结算`;
  	  	}
  	  },
  	  payClass() {
  	  	if (this.totalPrice === 0 || this.totalPrice < this.minPrice) {
  	  	  return `not-enough`;
  	  	} else {
  	  	  return `enough`;
  	  	}
  	  }
  	}
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
  	position: fixed
  	left: 0
  	bottom: 0
  	z-index: 55
  	width: 100%
  	height: 48px
  	.content
  	  display: flex
  	  background-color: #141d27
  	  font-size: 0
  	  color: rgba(255,255,255,0.4)
  	  .content-left
  	  	flex: 1
  	  	.logo-wrapper
  	  	  display: inline-block	
  	  	  position: relative
  	  	  top: -10px
  	  	  margin: 0 12px
  	  	  padding: 6px
  	  	  border-radius: 50%
  	  	  width: 58px
  	  	  height: 58px
  	  	  box-sizing: border-box
  	  	  vertical-align: top
  	  	  background-color: #141d27
  	  	  .logo
  	  	  	width: 100%
  	  	  	height: 100%
  	  	  	background-color: #2B343C
  	  	  	border-radius: 50%
  	  	  	text-align: center
  	  	  	&.highlight
  	  	  	  background-color: rgb(0,160,220)
  	  	  	.iconfont
  	  	  	  font-size: 24px
  	  	  	  line-height: 48px
  	  	  	  color: #80858a
  	  	  	  &.highlight
  	  	  	  	color: #fff
  	  	  .num
  	  	  	position: absolute
  	  	  	background-color: rgb(240,20,20)
  	  	  	box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4)
  	  	  	width: 24px
  	  	  	height: 16px
  	  	  	line-height: 16px
  	  	  	border-radius: 12px
  	  	  	font-size: 9px
  	  	  	font-weight: 700
  	  	  	color: rgb(255,255,255)
  	  	  	right: 0
  	  	  	top: 0
  	  	  	text-align: center
  	  	.price
  	  	  display: inline-block
  	  	  font-size: 16px
  	  	  line-height: 24px
  	  	  box-sizing: border-box
  	  	  padding-right: 12px
  	  	  border-right: 1px solid rgba(255,255,255,0.4)
  	  	  font-weight: 700
  	  	  margin-top: 12px
  	  	  vertical-align: top
  	  	  &.highlight
  	  	  	color: #fff
  	  	.desc
  	  	  display: inline-block
  	  	  font-size: 10px
  	  	  line-height: 48px
  	  	  margin-left: 12px
  	  	  vertical-align: top 
	  .content-right
	  	flex: 0 0 105px
	  	width: 105px
	  	font-size: 12px
	  	line-height : 48px
	  	font-weight: 700
	  	text-align: center
	  	&.not-enough
	  	  background-color: #2b333b
	  	  color: rgba(255, 255, 255, 0.4)
	  	&.enough
	  	  background-color: #00b43c	
	  	  color: #fff   
</style>
