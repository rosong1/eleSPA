<template>
	<transition name="fade">
	<div class="food" v-show="showFlag" ref="foodDetail">
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
					<ratingselect @select="getType" :desc="desc" :select-type="selectType" :only-content="onlyContent" :ratings="food.ratings" @toggle-content="getOnlyContent"></ratingselect>
					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
								<div class="content">
									<div class="content-left">
										<h3 class="time">{{formatTime(rating.rateTime)}}</h3>
										<div class="detail">
											<span class="icon">
												<i class="iconfont support" v-if="rating.rateType===0">&#xe60b;</i>
												<i class="iconfont" v-if="rating.rateType===1">&#xe60e;</i>
											</span>
											<span class="text">{{rating.text}}</span></div>
									</div>
									<div class="content-right">
										<span class="username">{{rating.username}}</span>
										<img :src="rating.avatar" alt="用户头像" class="avatar">
									</div>
								</div>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || !food.ratings.length">
							没有评价(⊙o⊙)哦
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</transition>
</template>

<script type="text/ecmascript-6">
import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
import split from 'components/split/split.vue';
import {formatTime} from 'common/js/date';
import ratingselect from 'components/ratingselect/ratingselect.vue';
import Vue from 'vue';
import BScroll from 'better-scroll';   //  给该组件绑定BScroll，使其内容区超出视口时，可以滚动  滚动区为绑定节点的第一个子节点

// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;

export default {
	name: 'foodDetail',
  props: {
  	food: {
  		type: Object
  	}
  },
  data() {
  	return {
  		showFlag: false,
  		selectType: ALL,
  		onlyContent: true,
  		desc: {
  			all: '全部',
  			positive: '推荐',
  			negative: '吐槽'
  		}
  	};
  },
  components: {
  	cartcontrol,
  	split,
  	ratingselect
  },
  methods: {
  	show() {  // 初始状态
  		this.showFlag = true;
  		this.selectType = ALL;
  		this.onlyContent = false;
  		this.$nextTick(() => {
  			if (!this.scroll) {
  				this.scroll = new BScroll(this.$refs.foodDetail, {
  					click: true
  				});
  			} else {
  				this.scroll.refresh();
  			}
  		});
  	},
  	getType(type) {
  		this.selectType = type;
  	},
  	getOnlyContent(onlyContent) {
  		this.onlyContent = onlyContent;
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
  	},
  	needShow(type, text) {
  		if (this.onlyContent && !text) {
  			return false;
  		}
  		if (this.selectType === ALL) {
  			return true;
  		} else {
  			return type === this.selectType;
  		}
  	},
  	formatTime(time) {
  		return formatTime(time);
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
				padding:18px
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
		.food-info .content .title, .food-ratings .content .title
			font-size: 14px
			color: rgb(7,17,27)
			font-weight: 600					  
		.food-info
			.content
				.desc
					font-size: 12px
					font-weight: 200
					color: rgb(77,85,93)
					line-height: 24px
					box-sizing: border-box
					padding: 8px 6px
		.food-ratings
			.content
				padding: 18px 0
				.title
					margin-left: 18px
				.rating-wrapper
					border-top: 1px solid rgba(7,17,27,0.1)
					padding: 0 18px
					.rating-item
						border-1px(rgba(7,17,27,0.1))
						.content
							display: flex
							justify-content: space-between
							color: rgb(147,153,159)
							.content-left
						  	.time
						  		margin-bottom: 6px
						  		font-size: 10px
						  		line-height: 12px
						  	.detail
						  		.iconfont
						  			font-size: 12px
						  			line-height: 24px
						  			margin-right: 4px
						  			&.support
						  				color: rgb(0,160,220)
						  		.text
						  			font-size: 12px
						  			color:rgb(7,17,27)
						  			line-height: 16px	
						  .content-right
						  	.username
						  		font-size: 10px
						  		line-height: 12px
						  		margin-right: 6px
						  		vertical-align: text-top
						  	.avatar
						  		width: 12px
						  		height: 12px
						  		border-radius: 50%
						  		vertical-align: text-top	
					.no-rating
						padding: 10px
						font-size: 12px
						color: #939393	  		
</style>
