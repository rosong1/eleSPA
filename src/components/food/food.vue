<template>
	<transition name="fade">
	<div class="food" v-show="showFlag" ref="foodScroll">
	  <div class="food-content">
			<div class="image-header">
				<img :src="food.image" alt="food.name">
				<div class="back" @click="hide()"><i class="iconfont">&#xe697;</i></div>
			</div>
			<div class="content">
				<h1 class="name">{{food.name}}</h1>
				<div class="extra">
					<span class="sellCount">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="nowPrice">￥{{food.price}}</span><span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
				</div>
				<div class="cartcontrol-wrapper">
					<cartcontrol :food="food"></cartcontrol>
				</div>
				<transition name="fade">
					<div class="buy" v-show="!food.count || food.count===0" @click="addFood">加入购物车</div>
				</transition>
			</div>
		</div>
		<split v-show="food.info"></split>
		<div class="food-info" v-show="food.info">
			<div class="content">
				<h1 class="title">商品介绍</h1>
				<p class="desc">{{food.info}}</p>
			</div>
		</div>
		<split></split>
		<div class="food-ratings">
			<div class="content">
				<h1 class="title">商品评价</h1>
			</div>
		</div>
	</div>
	</transition>
</template>

<script type="text/ecmascript-6">
import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
import split from 'components/split/split.vue';
import Vue from 'vue';
import BScroll from 'better-scroll';   //  给该组件绑定BScroll，使其内容区超出视口时，可以滚动
export default {
	name: 'foodDetail',
  props: {
  	food: {
  		type: Object
  	}
  },
  data() {
  	return {
  		showFlag: false
  	};
  },
  components: {
  	cartcontrol,
  	split
  },
  methods: {
  	show() {
  		this.showFlag = true;
  		this.$nextTick(() => {
  			console.log(1);
  			if (!this.scroll) {
  				console.log(1.1);
  				this.scroll = new BScroll(this.$refs.foodScroll, {
  					click: true
  				});
  			} else {
  				this.scroll.refresh();
  			}
  		});
  	},
  	hide() {
  		this.showFlag = false;
  	},
  	addFood(event) {
  		if (!event._constructed) {
  			return;
  		}
  		this.$emit('addMe', event.target);
  		Vue.set(this.food, 'count', 1);
  	}
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
	.food
		position: fixed
		width: 100%
		z-index: 30
		background-color #fff
		top: 0
		left: 0
		bottom: 48px
		transition: all 0.3s linear
		transform: translate3d(0,0,0)
		&.fade-enter, &.fade-leave-active
			transform: translate3d(-100%, 0, 0)
		.food-content .content, .food-info, .food-ratings
			padding: 18px
		.food-content
			.image-header/* 当图片未加载完成时，撑开它的高度 */
				position: relative
				width: 100%
				height: 0
				padding-top: 100%/* padding是相对自身宽度来撑开的 */
				img
					position: absolute
					width: 100%
					height: 100%
					top: 0
					left: 0
					border-radius: 10px
				.back
					position: absolute
					top: 0
					left: 0
					padding: 18px
					.iconfont
						font-size: 20px
						color: #fff
			.content
				color: rgb(147, 153, 159)
				position: relative
				.name
					font-size: 14px
					font-weight : 700
					color: rgb(7,17,27)
					line-height: 14px
				.extra
					margin: 8px 0 18px 0
					font-size: 10px
					line-height: 10px
					height: 10px
					.sellCount
				  	margin-right: 12px
				.price
					line-height: 24px
					.nowPrice
					  font-size: 14px
					  margin-right: 8px
					  color: rgb(240, 20, 20)
					  font-weight: 700
					.oldPrice
					  text-decoration: line-through
					  font-weight: 700
					  font-size: 10px	
				.cartcontrol-wrapper
					position: absolute
					bottom: 0
					right: 11px
				.buy
					position: absolute
					bottom: 18px
					right: 18px
					z-index: 30
					width: 76px
					height: 26px
					line-height: 26px
					border-radius: 12px
					text-align: center
					background-color: rgb(0,160,220)
					font-size: 10px
					color: #fff
					cursor: pointer
					transition: all 0.3s linear
					opacity: 1
					&:hover
						background-color: #0093ca
					&.fade-enter, &.fade-leave-active
					  opacity: 0				  
		.food-info
			.content
				.title
					font-size: 14px
					color: rgb(7,17,27)
					font-weight: 600
				.desc
					font-size: 12px
					font-weight: 200
					color: rgb(77,85,93)
					line-height: 24px
					box-sizing: border-box
					padding: 8px 6px	
</style>
